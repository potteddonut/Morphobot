const { Command } = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'You stepped on.. shit.',
            requiredPermissions: ['ATTACH_FILES'],
            usage: '<user:username>'
        });
    }
    async run(msg, [user]) {
        return msg.channel.sendFile(await this.client.idioticAPI.stepped(user.displayAvatarURL({ format: 'png', size: 128 })), 'stepped.png');
    }
};