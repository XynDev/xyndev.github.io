
# Disconnect Function

## Overview

This function manages the process of disconnecting from a server in the game. It performs three main tasks:

1. Checks if the player is currently connected to a server
2. Toggles the market if connected to an owned server
3. Disconnects from the current server

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `object` | Game state data, including current location |
| `updateTerminal` | `function` | Updates the game terminal with messages |

!!! note
    `args` and `location` parameters are present in the function signature but not used in the current implementation.

## Functionality

### 1. Connection Check

```javascript
if (!data.currentLocation) {
    updateTerminal('Not connected to any server.');
    return;
}
```

If not connected to any server, the function displays a message and exits.

### 2. Market Toggle

```javascript
const currentIP = data.currentLocation.ip;
if (data.locations.find(server => server.ip === currentIP && server.owned)) {
    toggleMarket();
}
```

Toggles the market if the current server is owned by the player.

### 3. Disconnect Process

```javascript
const disconnectedFrom = data.currentLocation.name;
data.currentLocation = null;
updateTerminal(`Disconnected from ${disconnectedFrom}`);
```

Disconnects from the current server and updates the terminal.

## Imported Functions

| Function | Source | Purpose |
|----------|--------|---------|
| `toggleMarket` | `../../data/handler.js` | Toggles the regular market |

!!! info
    `toggleBlackMarket` and `breachEffect` are imported but not used in this function.

## Example Usage

```javascript
disconnect({}, gameData, currentLocation, updateTerminalFunction);
```

This will attempt to disconnect from the current server, toggle the market if applicable, and update the game terminal with the result.

## Source Code

```javascript
import { toggleBlackMarket, toggleMarket } from "../../data/handler.js";
import { breachEffect } from "../effects/breach.js";

export default function(args, data, location, updateTerminal) {
    if (!data.currentLocation) {
        updateTerminal('Not connected to any server.');
        return;
    }

    const currentIP = data.currentLocation.ip;
    
    if (data.locations.find(server => server.ip === currentIP && server.owned)) {
        toggleMarket();
    }

    const disconnectedFrom = data.currentLocation.name;
    data.currentLocation = null;
    updateTerminal(`Disconnected from ${disconnectedFrom}`);
}
```
