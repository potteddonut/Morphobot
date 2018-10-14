const {
	Command
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pfp', 'profile'],
			description: 'Returns the avatar of a user in full size.'
		});
	}
	run(message, [member = message.member]) {
		return message.sendEmbed(new MessageEmbed()
			.setColor(member.displayHexColor || 0xFFFFFF)
			.setTitle('Here is your avatar: ')
			.setImage(message.author.displayAvatarURL({
				size: 2048
			})));
	}

};
