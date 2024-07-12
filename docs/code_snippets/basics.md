# Basics

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `args` | `Array<string>` | Command arguments from the terminal |
| `data` | `object` | Contains all the data in your save file |
| `location` | `object` | Contains information about the currently connected server |
| `updateTerminal` | `function` | Function to output messages to the terminal |

### Usage

Enter the IP address of the server as an argument to see its money percentage.

### Example Code

```javascript
export default function getServerMoneyPercentage(args, data, location, updateTerminal) {
    const targetIp = args;
    const targetServer = data.locations.find(server => server.ip === targetIp);

    if (!targetServer) {
        updateTerminal(`Error: Server with IP ${targetIp} not found.`);
        return;
    }

    const moneyPercentage = (targetServer.money / targetServer.maxmoney) * 100;
    updateTerminal(`Server ${targetServer.name} (${targetIp}) money: ${moneyPercentage.toFixed(2)}%`);
}
```