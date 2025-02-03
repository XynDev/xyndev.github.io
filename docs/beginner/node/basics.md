---
title: Learning Node.js Basics
description: "A guide to understanding core Node.js concepts, including modules, file system, and asynchronous programming."
---

# Node.js Basics

Node.js is a runtime environment that allows you to run JavaScript outside the browser. It provides a set of built-in modules to handle various functionalities like file manipulation, server creation, and asynchronous programming.

## What Is Node.js?

Node.js is a **JavaScript runtime** built on **Chrome's V8 engine**. It is designed for **scalable, high-performance applications**, often used for backend services like APIs and web servers.

::: tip Quick Tip
Node.js is **single-threaded** but uses **non-blocking, event-driven architecture** to handle multiple tasks efficiently.
:::

## Using Modules in Node.js

Node.js follows a **modular** approach where different functionalities are separated into reusable **modules**.

### CommonJS Modules (`require()` and `module.exports`)

Node.js uses the **CommonJS module system** to organize and reuse code.

#### Importing a Module

```javascript
const fs = require('fs'); // Importing the built-in File System module
```

#### Creating a Custom Module

Create a file `math.js`:

```javascript
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

Import it in another file:

```javascript
const math = require('./math');
console.log(math.add(2, 3)); // 5
```

::: info Important
Always use `module.exports` to expose functions and variables from a module.
:::

## File System (`fs` Module)

The **`fs` module** allows you to read and write files in Node.js.

### Reading a File (Synchronous)

```javascript
const fs = require('fs');
const data = fs.readFileSync('example.txt', 'utf8');
console.log(data);
```

### Writing to a File (Asynchronous)

```javascript
fs.writeFile('example.txt', 'Hello, Node.js!', (err) => {
  if (err) throw err;
  console.log('File written successfully!');
});
```

## Understanding Asynchronous JavaScript

Node.js handles **asynchronous operations** using **callbacks, promises, and async/await**.

### Callbacks

A **callback** is a function passed as an argument to another function.

```javascript
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

### Promises

Promises offer a cleaner way to handle async operations.

```javascript
const fs = require('fs').promises;

fs.readFile('example.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await

The **async/await** syntax makes asynchronous code easier to read.

```javascript
const readFileAsync = async () => {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

readFileAsync();
```

## Creating a Basic Server with HTTP Module

Node.js allows you to create a server using the built-in **HTTP module**.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

::: info How It Works
- `createServer()` creates a server.
- `req` handles incoming requests.
- `res` sends a response.
:::

## Understanding Buffers & Streams

Buffers are used for handling binary data, while streams process data efficiently.

### Using Buffers

```javascript
const buffer = Buffer.from('Hello');
console.log(buffer.toString()); // Output: Hello
```

### Using Streams

```javascript
const fs = require('fs');

const readStream = fs.createReadStream('example.txt', 'utf8');
readStream.on('data', chunk => {
  console.log(chunk);
});
```

## Conclusion

Node.js is a **powerful and scalable** environment for JavaScript applications. By understanding **modules, the file system, asynchronous programming, and HTTP servers**, you lay the foundation for building real-world applications.
