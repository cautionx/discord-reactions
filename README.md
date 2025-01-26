# discord-reactions

A simple utility for setting up reaction roles using Discord.js.

## Installation

```bash
npm install discord-reactions
```

## Usage

```javascript
const { Client, GatewayIntentBits } = require('discord.js');
const setupReactionRoles = require('discord-reactions');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as: ${client.user.tag}`);

    const messageId = 'MESSAGE_ID'; // Replace with your message ID
    const roles = [
        { emoji: '👍', roleId: 'ROLE_ID_1' },
        { emoji: '👎', roleId: 'ROLE_ID_2' },
    ];

    setupReactionRoles(client, messageId, roles);
});

client.login('TOKEN'); // Get your app token: https://discord.com/developers
```

## License

This project is licensed under the MIT License.