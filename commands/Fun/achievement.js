const { Command } = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'You achieved something! :D',
            usage: '<text:str>',
            requiredPermissions: ['ATTACH_FILES']
        });
    }
    async run(msg, [text]) {
        await msg.channel.sendFile(this.client.idioticAPI.achievement(msg.author.displayAvatarURL({ format: 'png', size: 32 }), text), 'achievement.png');
    }
};