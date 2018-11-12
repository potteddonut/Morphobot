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
			description: 'Returns the avatar of a user in full size.',
			usage: '[user:user]'
		});
	}
	run(message, [user = message.author]) {
		return message.sendEmbed(new MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL(), user.displayAvatarURL())
			.setImage(user.displayAvatarURL()));
	}

};
