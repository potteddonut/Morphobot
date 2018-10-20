const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            guarded: true,
            description: language => language.get('COMMAND_INVITE_DESCRIPTION')
        });
    }

    async run(message) {
        return message.sendEmbed(new MessageEmbed()
            .setAuthor("Inviting Morphobot", this.client.user.displayAvatarURL())
            .setDescription(`You can invite Morphobot to your guild [here](https://discordapp.com/oauth2/authorize?client_id=499457091526721538&permissions=134220800&scope=bot).
			If you require help regarding the bot, you can join the support guild [here](https://discord.gg/WRR2pUt).`)
            .setColor(message.member.displayHexColor)
            .setFooter("Morphobot").setTimestamp());
    }

    async init() {
        if (this.client.application && !this.client.application.botPublic) this.permissionLevel = 10;
    }

};