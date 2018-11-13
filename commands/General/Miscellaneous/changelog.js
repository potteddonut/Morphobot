const {
	Command
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'changelog',
			description: 'Fetches the latest changelog containing details about Morphobot updates.',
			aliases: ['updates', 'cl']
		});
	}
	async run(message) {
		const channel = this.client.channels.get('499901290579492865');
		const changelog = await channel.messages.fetch({
			limit: 1
		}).then((msgs) => msgs.first());
		message.channel.sendEmbed(new MessageEmbed()
			.setTitle('Latest changelog entry: ')
			.setColor(message.member.displayHexColor)
			.setDescription(changelog)
			.setFooter(`Morphobot Changelogs`).setTimestamp());
	}

};
