const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['vote']
        });
    }
    run(message) {
        message.sendEmbed(new MessageEmbed()
            .setAuthor(`Upvoting Morphobot`, this.client.user.displayAvatarURL())
            .setDescription(`You can upvote Morphobot [here](https://discordbots.org/bot/499457091526721538/vote).
                            Thanks for supporting us!`)
            .setColor(message.member.displayHexColor));
    }
}