const { Command } = require('klasa');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Batslaps the user.',
            requiredPermissions: ['ATTACH_FILES'],
            usage: '<user:username>'
        });
    }
    async run(msg, [user]) {
        // because you simply shouldn't slap yourself, duh
        if (user === msg.author) return msg.responder.error("And.. why would you want to slap yourself?");
        return msg.channel.sendFile(await this.client.idioticAPI.batSlap(msg.author.displayAvatarURL({ size: 128, format: 'png' }), user.displayAvatarURL({ format: 'png', size: 256 })), 'slap.png');
    }
};