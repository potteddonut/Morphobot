const {
    Command
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: "changelog",
            description: "Fetches the latest changelog containing details about Morphobot updates.",
            aliases: ['updates', 'cl']
        });
    }
    run(message) {
        const changelog = this.client.channels.get('499901290579492865').lastMessage;
        message.channel.sendEmbed(new MessageEmbed()
            .setTitle('Latest changelog entry: ')
            .setDescription(changelog));
    }
}