const { Command } = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Paint a pretty little picture, a work of art.',
            requiredPermissions: ['ATTACH_FILES'],
            usage: '[user:username]',
        });
    }
    async run(msg, [user = msg.author]) {
        return msg.channel.sendFile(await this.client.idioticAPI.bobRoss(user.displayAvatarURL({ format: 'png', size: 512 })), 'bobross.png');
    }
};