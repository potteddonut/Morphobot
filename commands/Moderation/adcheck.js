const {
    Command
} = require("klasa");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 5,
            aliases: ["adscheck"],
            runIn: ["text"]
        })
    }
    run(message, [channel = message.channel]) {
        let check = message.guild.members.filter(m => m.displayName.includes('discord.gg') === m.username);
        message.channel.send(message.guild.members.map(m => check === true).username)
    }
};