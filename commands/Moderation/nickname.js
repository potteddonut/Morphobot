const {
	Command
} = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Changes the nickname of a user.',
			permissionLevel: 4,
			aliases: ['nick'],
			runIn: ['text'],
			requiredPermissions: ['MANAGE_NICKNAMES'],
			usage: '[user:member] [newnickname:str][...]',
			usageDelim: ' '
		});
	}

	async run(msg, [user = msg.member, ...newNickname]) {

		newNickname = newNickname.join(this.usageDelim);

		if (!newNickname) {
			await user.setNickname('')
				.then(() => msg.responder.success(`Succesfully reset **${user.user.tag}**'s nickname.`))
				.catch(() => {
					throw msg.responder.error(`I can't reset the nickname. Make sure their highest role is below mine.`)
				})
		} else {
			await user.setNickname(newNickname)
				.then(() => msg.responder.success(`Succesfully set **${user.user.tag}**'s nickname to **${newNickname}**`))
				.catch(() => {
					throw msg.responder.error(`I can't change that user's nickname. Make sure their highest role is below mine.`)
				});
		}
	}

};
