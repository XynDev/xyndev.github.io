---
title: "Express API Tutorial"
description: "Creating your own API from scratch"
---

# Express API Documentation

## Introduction

This tutorial is designed for beginners and students who want to learn how to build an Express API from scratch. We will cover everything from setting up the project to handling API requests efficiently with rate limiting and file retrieval.

## Prerequisites
- Basic knowledge of JavaScript
- Node.js installed (download from [nodejs.org](https://nodejs.org/))
- A code editor (VS Code recommended)

## Setting Up the Project

1. **Initialize a Node.js project**
   ```sh
   mkdir express-api-tutorial && cd express-api-tutorial
   npm init -y
   ```
   This will create a `package.json` file that keeps track of dependencies.

2. **Set project type to ES modules**
   Open `package.json` and add:
   ```json
   {
     "type": "module"
   }
   ```
   This allows us to use `import/export` instead of `require`.

3. **Install dependencies**
   ```sh
   npm install express
   ```

4. **Project Structure**
   ```
   express-api-tutorial/
   ├── helper/
   │   ├── file.js
   │   ├── rateLimiter.js
   ├── utility/
   │   ├── handler/
   ├── server.js
   ├── package.json
   ├── README.md
   ```

## API Endpoints

### `/api/information/:version/:team`
- **Method**: GET
- **Params**:
  - `version`: API version (e.g., `v1`)
  - `team`: Target team name
- **Response**:
  - A filtered list of team members with names and roles.

### `/api/data/:version/:type`
- **Method**: GET
- **Params**:
  - `version`: API version (e.g., `v1`)
  - `type`: Data type filename
- **Response**:
  - The JSON content from the respective file with ignored entries removed.

## Code Overview

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

export default function (app) {
    app.get('/api/information/:version/:team', (req, res) => handleAPI(req, res, () => {
        const { version, team } = req.params;
        const content = retrieveFileContent('private/data/team.json');
        if (!content) return res.status(500).send('Data unavailable');
        
        const teamData = JSON.parse(content)[team];
        if (!teamData) return res.status(404).send('Team not found');
        
        res.json(version === 'v1' ? teamData.map(({ name, role, Age }) => ({ name, role, age: Age })) : 'Invalid API version');
    }));

    app.get('/api/data/:version/:type', (req, res) => handleAPI(req, res, () => {
        if (req.params.version !== 'v1') return res.status(400).send('Invalid API version');
        const content = retrieveFileContent(`private/data/${req.params.type}.json`);
        if (!content) return res.status(500).send('Data unavailable');
        
        try {
            const processData = data => Array.isArray(data) ? data.map(processData) :
                (typeof data === 'object' && data !== null && data.tag?.toLowerCase() !== 'ignore')
                ? Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'tag').map(([k, v]) => [k, processData(v)]))
                : data;
            
            res.json(processData(JSON.parse(content)));
        } catch {
            res.status(500).send('Error processing data');
        }
    }));
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
const handlersPath = path.join(__dirname, 'utility/handler');

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

## Conclusion
This tutorial provides a structured way for beginners to set up an Express API with modularity, rate limiting, and data retrieval. With this foundation, students can expand their API with additional endpoints and logic.

**Next Steps:**
- Implement authentication
- Add database support (MongoDB, PostgreSQL, etc.)
- Improve error handling

