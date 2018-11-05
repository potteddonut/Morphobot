const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'randquote',
            description: 'Quotes a random message from the channel',
            requiredPermissions: ['READ_MESSAGE_HISTORY', 'EMBED_LINKS']
        });
    }
    async run(message) {
        let messageBank = await message.channel.messages.fetch({
            limit: 100
        });
        for (let i = 1; i < messageLimitHundreds; i++) {
            messageBank = messageBank.concat(await message.channel.messages.fetch({
                limit: 100,
                before: messageBank.last().id
            }));
        };
        const msg = messageBank
            .filter(ms => !ms.author.bot && ms.content.replace(/[\W0-9]*/g, '').length >= 20)
            .random();
        if (!msg) throw 'Could not find a message to quote!';
        return message.sendEmbed(new MessageEmbed()
            .setDescription(msg.content)
            .setAuthor(msg.author.username, msg.author.displayAvatarURL()));
    }
}