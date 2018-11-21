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
			requiredPermissions: ['MANAGE_NICKNAMES'],
			usage: '[user:member] [newnickname:str][...]',
			usageDelim: ' '
		});
	}

	// async run(message, [user = message.member, newNickName]) {
	// 	if (!newNickName) { newNickName = '' };
	// 	newNickName = newNickName.join(this.usageDelim);
	// 	await user.setNickname(newNickName)
	// 		.then(() => message.send(`Succesfully set **${user.user.tag}**'s nickname to **${newNickName}**.`))
	// 		.catch(() => {
	// 			throw "I can't change that user's nickname. Make sure their role is below mine.";
	// 		});
	// }

	async run(msg, [user = msg.member, ...newnickname]) {
		newnickname = newnickname.join(this.usageDelim);
		if (!newnickname) return msg.sendMessage(`**${msg.author.tag}**'s current nickname is - **${user.displayName}**`);
		if ('reset' in msg.flags) newnickname = '';
		await user.setNickname(newnickname)
			.then(() => msg.responder.success(`Succesfully set **${user.user.tag}**'s nickname to **${newnickname}**.`))
			.catch(() => {
				throw "I can't change that user's nickname. Make sure their highest role is below mine."
			});
	}

};
