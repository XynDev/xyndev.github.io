---
title: Learning Express.js Fundamentals
description: "A guide to understanding Express.js, including setup, routing, middleware, and handling requests."
---

# Express.js Fundamentals

Express.js is a **minimal and flexible** Node.js web application framework that provides a robust set of features for building web applications and APIs.

## What Is Express.js?

Express.js is a **backend framework** for Node.js that simplifies server creation, routing, middleware handling, and request processing. It is widely used for building REST APIs and web applications.

::: tip Quick Tip
Express.js helps you build web applications faster by providing an easy-to-use abstraction over the Node.js HTTP module.
:::

## Setting Up Express.js

To use Express.js, install it via npm:

```bash
npm init -y  # Initialize a new Node.js project
npm install express  # Install Express.js
```

### Creating a Basic Express Server

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, Express.js!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

::: info Important
The `app.listen(PORT, callback)` method starts an Express server that listens for incoming requests on the specified port.
:::

## Routing in Express.js

Express.js allows you to define different routes to handle HTTP requests.

### Basic Routes

```javascript
app.get('/about', (req, res) => {
    res.send('About Page');
});

app.post('/submit', (req, res) => {
    res.send('Form Submitted');
});
```

### Route Parameters

```javascript
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});
```

## Middleware in Express.js

Middleware functions execute **before** sending a response. Express has built-in and custom middleware.

### Built-in Middleware

```javascript
app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded data
```

### Custom Middleware

```javascript
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});
```

## Serving Static Files

To serve static files like images, CSS, or JavaScript files:

```javascript
app.use(express.static('public'));
```

Place files inside a `public` folder, and they will be accessible in the browser.

## Handling Errors

To handle errors in Express.js:

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
```

## Working with JSON and Query Parameters

### Handling JSON Data

```javascript
app.post('/data', (req, res) => {
    res.json({ message: 'Data received', data: req.body });
});
```

### Using Query Parameters

```javascript
app.get('/search', (req, res) => {
    res.send(`Search term: ${req.query.q}`);
});
```

## Conclusion

Express.js makes building web applications and APIs easy by providing routing, middleware, and error-handling features. By mastering these fundamentals, you’ll be ready to create robust backends for your applications.

