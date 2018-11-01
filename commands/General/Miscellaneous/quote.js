const {
    Command,
    Argument,
    Timestamp
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Quotes a message.",
            usage: '[channel:channel] <message:str>',
            usageDelim: ' '
        });
        this.timestamp = new Timestamp('dddd d hh:mm');
    }
    async run(message, [channel = message.channel, id]) {
        if (!Argument.regex.snowflake.test(id)) throw "An invalid message ID was given!";
        const msg = await channel.messages.fetch(id).catch(() => null);
        if (!msg) throw "Your message does not exist, is not from this channel, or was not found. Try providing a channel before the ID."
        await message.guild.members.fetch(msg.author);
        return message.sendEmbed(new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
            .setColor(msg.member.displayHexColor)
            .setDescription(msg.cleanContent)
            .setFooter(`Sent at`).setTimestamp(message.createdAt)
            .setImage(msg.attachments.size ? message.attachments.first().url : null));
    }
}