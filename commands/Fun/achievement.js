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
        if (text.length > 22) throw msg.responder.error("Text cannot exceed 22 characters!")
        await msg.channel.send(new MessageAttachment(
            await this.client.idioticAPI.achievement(msg.author.displayAvatarURL({ format: 'png', size: 32 }), text),
            'achievement.png'));
    }
}; 