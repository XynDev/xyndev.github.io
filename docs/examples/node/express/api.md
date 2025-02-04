---
title: "Express API Tutorial"
description: "Creating your own api"
---
# Express API Documentation

## Introduction

This documentation provides an overview of an Express-based API that handles rate-limited requests for retrieving team and data information. It utilizes middleware for rate limiting and file retrieval to ensure efficient request handling.

## Features
- **Rate Limiting**: Prevents excessive requests from a single IP.
- **Dynamic File Retrieval**: Loads JSON data dynamically from the filesystem.
- **Versioned API**: Supports version-based requests.
- **Tag-Based Filtering**: Removes specific objects marked with `"ignore"` tags.
- **Modular Handler Loading**: Dynamically loads handlers from the `utility/handler` directory.

## API Endpoints

### `/api/information/:version/:team`
- **Method**: GET
- **Params**:
  - `version`: API version (e.g., `v1`).
  - `team`: Target team name.
- **Query Parameters**:
  - `option` (optional): `minimal` or `full` response.
- **Response**:
  - A filtered list of team members with names and roles.

### `/api/data/:version/:type`
- **Method**: GET
- **Params**:
  - `version`: API version (e.g., `v1`).
  - `type`: Data type filename.
- **Response**:
  - The JSON content from the respective file with ignored entries removed.

## Code Overview

### Express API Logic
```js
import express from 'express';
import { rateLimit } from '../helper/rateLimiter.js';
import { retrieveFileContent } from '../helper/file.js';

const categoryLimits = { '/api/information': 10, '/api/data': 10 };

function handleAPI(req, res, handler) {
    if (!rateLimit(req.ip, categoryLimits[req.path] || 1)) {
        return res.status(429).send('Too many requests');
    }
    handler(req, res);
}
```

### File Retrieval Module
```js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveFilePath(filePath) {
    let resolvedPath = path.resolve(__dirname, filePath);
    
    if (fs.existsSync(resolvedPath)) {
        return resolvedPath;
    }

    resolvedPath = path.resolve(process.cwd(), filePath);
    if (fs.existsSync(resolvedPath)) {
        return resolvedPath;
    }

    console.error(`File not found: ${filePath}`);
    return null;
}

function retrieveFileContent(filePath) {
    const resolvedPath = resolveFilePath(filePath);
    if (!resolvedPath) {
        return null;
    }

    try {
        return fs.readFileSync(resolvedPath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
        return null;
    }
}

export { retrieveFileContent };
```

### Rate Limiting Middleware
```js
const requestCounts = {};
const RATE_LIMIT = 5;
const TIME_WINDOW = 60000;

export function rateLimit(ip) {
    const now = Date.now();
    
    if (!requestCounts[ip]) {
        requestCounts[ip] = [];
    }

    requestCounts[ip] = requestCounts[ip].filter(timestamp => now - timestamp < TIME_WINDOW);

    if (requestCounts[ip].length >= RATE_LIMIT) {
        return false;
    }

    requestCounts[ip].push(now);
    return true;
}
```

### Server Setup & Handler Loading
```js
import express from 'express';
import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handlersPath = path.join(__dirname, '../utility/handler');

const app = express();

async function loadHandlers(app) {
    try {
        const files = await readdir(handlersPath);
        for (const file of files) {
            if (file.endsWith('.js')) {
                const filePath = pathToFileURL(path.join(handlersPath, file)).href;
                const handler = await import(filePath);
                if (typeof handler.default === 'function') {
                    handler.default(app);
                    console.log(`Loaded handler: ${file}`);
                } else {
                    console.warn(`Handler ${file} does not export a default function`);
                }
            }
        }
    } catch (err) {
        console.error('Error loading handlers:', err);
    }
}

loadHandlers(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```

## How It Works
1. **Rate Limiting**: The `rateLimit` function ensures that each IP can only make a limited number of requests per time window.
2. **Handling API Requests**: The `handleAPI` function enforces rate limiting and delegates the request to a handler function.
3. **Retrieving Data**: The `retrieveFileContent` function reads JSON data dynamically from the filesystem.
4. **Filtering Data**: Any object marked with `"tag": "ignore"` is excluded from responses.
5. **Handler Loading**: The `server.js` file dynamically loads all handlers from the `utility/handler` directory, making the API easily extendable.

## Conclusion
This API is structured for efficient data retrieval while maintaining security and performance via rate limiting. It provides a scalable and modular approach for handling structured data requests.

