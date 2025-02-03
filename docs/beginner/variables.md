---
title: Learning Variables
description: "A guide to understanding variables in JavaScript, how to declare them, and why they work the way they do."
---

# Variables

Variables are one of the most fundamental building blocks in programming. They allow us to store, manipulate, and retrieve data throughout our code.

## What Is a Variable?

A variable is like a container that holds data. In JavaScript, variables can store numbers, strings, objects, and more. They help you keep track of information and work with it as your program runs.

::: tip Quick Tip
Think of variables as labeled boxes where you can store data. The right label helps you remember what's inside!
:::

## Declaring Variables in JavaScript

JavaScript offers three primary ways to declare variables:

### `var`

- **Scope:** Function-scoped.
- **Hoisting:** Variables declared with `var` are hoisted to the top of their function.
- **Usage:** Once popular, but now less common due to some quirks that can lead to unexpected behavior.

```javascript
var greeting = "Hello, world!";
```

### `let`

- **Scope:** Block-scoped.
- **Usage:** Ideal when you expect the variable’s value to change.
- **Benefits:** Provides better control over the variable’s visibility and lifecycle.

```javascript
let count = 1;
count = 2;  // Updating the value is allowed.
```

### `const`

- **Scope:** Block-scoped.
- **Usage:** Use when you want the variable's value to remain constant.
- **Benefits:** Helps prevent accidental reassignments, making your code safer.

```javascript
const PI = 3.14159;
// PI = 3.14; // This will cause an error because reassignment is not permitted.
```

::: note Important
Always favor `let` or `const` over `var` to avoid issues with hoisting and unexpected behavior.
:::

## Variable Naming Conventions

Good variable names improve code readability and maintainability. Here are some best practices:

- **Be Descriptive:** Choose names that clearly describe the data.
- **Use Camel Case:** Start with a lowercase letter and capitalize subsequent words (e.g., `firstName`, `userAge`).
- **Avoid Reserved Words:** Do not use JavaScript reserved words like `class`, `return`, or `let`.

## Data Types and Variables

Variables in JavaScript can hold various types of data:

- **Number:** For numeric values.
- **String:** For text.
- **Boolean:** For true/false values.
- **Object:** For structured data.
- **Array:** A special type of object used for ordered lists.
- **Undefined/Null:** Represent the absence of a value.

```javascript
let age = 25;           // Number
let name = "Alice";     // String
let isActive = true;    // Boolean
let user = {            // Object
  id: 1,
  username: "alice123"
};
let scores = [10, 20, 30]; // Array
let notAssigned;        // Undefined
let emptyValue = null;  // Null
```

## Understanding Scope

Scope determines where a variable can be accessed within your code:

- **Global Scope:** Variables declared outside any function or block. Accessible from anywhere.
- **Local Scope:** Variables declared within a function or block. Accessible only within that specific area.

```javascript
let globalVar = "I'm global";

function showScope() {
  let localVar = "I'm local";
  console.log(globalVar); // Accessible here
  console.log(localVar);  // Accessible here
}

showScope();
// console.log(localVar); // Error: localVar is not defined here
```

::: info How It Works
Proper use of variable declarations and understanding scope is essential for managing data flow and avoiding errors in your programs.
:::

## Conclusion

Understanding how variables work is crucial for every programmer. By mastering variable declaration, naming, and scope, you build a strong foundation for learning more advanced JavaScript concepts.

