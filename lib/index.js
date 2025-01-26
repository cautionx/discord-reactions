const { Client } = require('discord.js');

/**
 * Sets up reaction roles for a Discord server.
 * @param {Client} client - The Discord.js client.
 * @param {string} messageId - The ID of the message to listen for reactions.
 * @param {Array<{emoji: string, roleId: string}>} roles - The mapping of emojis to role IDs.
 */
function setupReactionRoles(client, messageId, roles) {
    if (!client || !(client instanceof Client)) {
        throw new Error("Invalid Discord client provided.");
    }
    if (!messageId || !Array.isArray(roles)) {
        throw new Error("Invalid parameters. Provide a message ID and an array of roles.");
    }

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.id === messageId && !user.bot) {
            const roleMapping = roles.find(r => r.emoji === reaction.emoji.name);
            if (roleMapping) {
                const guild = reaction.message.guild;
                const member = await guild.members.fetch(user.id);
                const role = guild.roles.cache.get(roleMapping.roleId);
                if (role) {
                    try {
                        await member.roles.add(role);
                        // Notify the user
                        const dmChannel = await user.createDM();
                        await dmChannel.send(`✅ Added **${role.name}**.`);
                    } catch (error) {
                        console.error(`[ERROR] ${error}`);
                    }
                }
            }
        }
    });

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.id === messageId && !user.bot) {
            const roleMapping = roles.find(r => r.emoji === reaction.emoji.name);
            if (roleMapping) {
                const guild = reaction.message.guild;
                const member = await guild.members.fetch(user.id);
                const role = guild.roles.cache.get(roleMapping.roleId);
                if (role) {
                    try {
                        await member.roles.remove(role);
                        // Notify the user
                        const dmChannel = await user.createDM();
                        await dmChannel.send(`❌ Removed **${role.name}**.`);
                    } catch (error) {
                        console.error(`[ERROR] ${error}`);
                    }
                }
            }
        }
    });
}

module.exports = setupReactionRoles;