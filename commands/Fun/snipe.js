const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['deleted'],
            permissionLevel: 5,
        });
    }
    async run(message) {
        if (!message.channel.sniped) throw "The bot can't find any deleted messages in it's cache!"
        message.channel.sendEmbed(new MessageEmbed()
            .setAuthor(`${message.channel.sniped.author.tag}`, message.channel.sniped.author.displayAvatarURL())
            .setColor(message.member.displayHexColor)
            .setDescription(message.channel.sniped));
    }
}