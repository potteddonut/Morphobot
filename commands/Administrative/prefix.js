const {
    Command
} = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "prefix",
            runIn: ['text'],
            usage: "[reset|prefix:str{1,10}]",
            permissionLevel: 6,
            description: "Changes the bot prefix in the server."
        });
    }
    async run(message, [prefix]) {
        if (!prefix) return message.send(`The current prefix for this guild is \`${message.guild.settings.prefix}\``);
        if (prefix === "reset") return this.reset(message);
        if (message.guild.settings.prefix === prefix) throw `The supplied prefix is already the set prefix for this server.`;
        await message.guild.settings.update('prefix', prefix);
        return message.send(`The prefix for this guild has been changed to \`${prefix}\``);
    }
    async reset(message) {
        await message.guild.settings.reset('prefix');
        return message.send(`Set this guild's prefix back to \`${this.client.options.prefix}\``)
    }
};