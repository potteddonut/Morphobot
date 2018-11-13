const {
	Command
} = require('klasa');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			name: 'warn',
			runIn: ['text'],
			usageDelim: ' ',
			usage: '<member:member> [reason:string] [...]',
			description: 'Warns a server member.'
		});
	}
	async run(message, [member, ...reason]) {
		if (member === message.author) return message.send("You.. can't kick yourself.");
		member = await message.guild.members.fetch(member);

		if (member.roles.highest.position >= message.member.roles.highest.position) return message.send("You can't warn members of the same or higher rank!");

		if (message.guild.settings.get("modlogs")) {
			this.client.moderation.warn({
				guild: message.guild,
				target: member.user,
				moderator: message.author,
				reason
			})
		}
		await member.user.send(`You have been warned in \`${message.guild.name}\` for \`${reason}\``).catch(() => null);
		return message.responder.success(`\`${member.user.tag}\` has been succesfully warned.`)
	}
}

