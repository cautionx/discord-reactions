# Simple Discord Reaction Roles

A simple utility for setting up reaction roles using Discord.js.

## Installation

```bash
npm install simple-discord-reaction-roles
```

## Usage

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const setupReactionRoles = require('simple-discord-reaction-roles');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const messageId = 'YOUR_MESSAGE_ID'; // Replace with your message ID
    const roles = [
        { emoji: '👍', roleId: 'ROLE_ID_1' },
        { emoji: '👎', roleId: 'ROLE_ID_2' },
    ];

    setupReactionRoles(client, messageId, roles);
});

client.login('YOUR_BOT_TOKEN');
```

## License

This project is licensed under the MIT License.