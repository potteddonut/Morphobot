const { Command } = require('klasa');
const { MessageAttachment } = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'You achieved something! :D',
            usage: '<text:str>',
            requiredPermissions: ['ATTACH_FILES']
        });
    }
    async run(msg, [text]) {
        await msg.channel.send(new MessageAttachment(
            await this.client.idioticAPI.achievement(message.author.displayAvatarURL({ format: 'png', size: 32 }), text),
            'achievement.png'));
    }
};