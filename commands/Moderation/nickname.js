const {
	Command
} = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Changes the nickname of a user.',
			permissionLevel: 5,
			aliases: ['nick'],
			runIn: ['text'],
			usage: '<user:member> <nickname:str>[...]',
			usageDelim: ' '
		});
	}
	async run(message, [user, ...newNickName]) {
		newNickName = newNickName.join(this.usageDelim);
		await user.setNickname(newNickName)
			.then(() => message.send(`Succesfully set **${user.tag}**'s nickname to **${newNickName}.`));
	}

};
