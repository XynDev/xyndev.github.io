


# TaskWeaver Documentation

TaskWeaver is a powerful Lua task management library designed to schedule and manage routines effectively, 
with support for extensions and lifecycle hooks.

---

## Features

- Create, pause, resume, and stop tasks effortlessly.
- Extend tasks with custom extension hooks.
- Built-in performance options (throttling and execution time control).
- Error-safe, robust API with user-friendly logging.

---

## Getting Started

### Installation

To use TaskWeaver, include it in your project using your preferred script placement and ensure required dependencies (e.g., `task` API or equivalent threading mechanism) are available.

**Example Folder Structure:**
```plaintext
ProjectRoot/
├── TaskWeaver.lua
├── Extensions/
│   ├── Logger.lua
│   └── CustomExtension.lua
```

### Usage Example

Here’s how you can use TaskWeaver in your project:

```lua
local TaskWeaver = require(script.Parent.TaskWeaver)

-- Create a TaskWeaver instance
local weaver = TaskWeaver.new()

-- Create a task
local myTask = weaver:CreateTask("ExampleTask", function()
    print("Task is running!")
    task.wait(1)
end)

-- Start and pause task
myTask:Resume()
task.wait(2)
myTask:Pause()
```

---

## API Reference

### `TaskWeaver.new`

**Description:**  
Creates a new TaskWeaver instance.

**Returns:**  
- `TaskWeaver` – An initialized TaskWeaver object.

```lua
local weaver = TaskWeaver.new()
```

---

### `TaskWeaver:CreateTask`

**Description:**  
Creates a new task and assigns it a unique name and function.

**Signature:**  
```lua
TaskWeaver:CreateTask(name: string, taskFunc: () -> ()): Task
```

**Parameters:**  
- `name` (string) – The name of the task.  
- `taskFunc` (function) – A function that defines the task logic.

**Returns:**  
- `Task` – The created Task object.

**Example:**  
```lua
local task = weaver:CreateTask("PrintTask", function()
    print("Hello from Task!")
end)
```

---

### `Task:Resume`

**Description:**  
Resumes a paused task or starts it for the first time.

**Signature:**  
```lua
Task:Resume(): Task
```

**Returns:**  
- `Task` – The resumed task object.

**Example:**  
```lua
task:Resume()
```

---

### `Task:Pause`

**Description:**  
Pauses the execution of a running task.

**Signature:**  
```lua
Task:Pause(): Task
```

**Returns:**  
- `Task` – The paused task object.

**Example:**  
```lua
task:Pause()
```

---

### Full Task API

| Method                      | Description                                   |
|-----------------------------|-----------------------------------------------|
| **Task:LoadExtension**      | Loads and registers an extension for the task.|
| **Task:Then**               | Adds a callback function after task events.  |
| **Task:Stop**               | Stops the task and closes its coroutine.     |
| **Task:Bind**               | Binds a function to run during the task loop.|
| **Task:Unbind**             | Removes a previously bound function.         |

---

## Extensions

TaskWeaver supports custom extensions to hook into lifecycle events like task creation, pausing, or stopping.

**Extension Structure:**  
```lua
Extension = {
    name = "ExtensionName",
    onLoad = function(task) ... end,
    onEvent = function(task, event) ... end,
    events = { onResume = true, onPause = true },
}
```

**Example: Logger Extension**  
```lua
local Logger = {
    name = "Logger",
    onLoad = function(task)
        print("Logger loaded for task:", task.name)
    end,
    onEvent = function(task, event)
        print(task.name .. " triggered event:", event)
    end,
    events = { onResume = true, onPause = true }
}

return Logger
```

To use an extension:  
```lua
myTask:LoadExtension("Logger")
```

---

## Performance Settings

Optimize task behavior with these performance options:

| Option                 | Description                                                |
|------------------------|------------------------------------------------------------|
| **throttleRate**       | The delay between task iterations (in seconds).            |
| **maxExecutionTime**   | The maximum time a task can execute before stopping (seconds). |

Set these options during task creation or dynamically update them. Example:

```lua
myTask.performanceOptions.throttleRate = 0.5
```

---

## Error Handling

Errors are gracefully caught using `pcall`. TaskWeaver will log issues without halting the execution of other tasks or extensions. Monitor logs to debug errors effectively:

```plaintext
[TaskWeaver] Task 'ExampleTask' encountered an error: <error message>
```

---

## Troubleshooting

| Problem                      | Solution                                             |
|------------------------------|-----------------------------------------------------|
| Extensions not loading       | Ensure your `Extensions` folder is named correctly. |
| Task not resuming            | Verify `task:Resume()` is called only after creation or pause. |
| Performance issues           | Use `throttleRate` to manage execution frequency.    |

---

## License and Acknowledgments

Created by **Xynterical**, 2024. Licensed for educational and open-source use.

---


