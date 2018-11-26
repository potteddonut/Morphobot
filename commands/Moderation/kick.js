const {
	Command
} = require('klasa');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			name: 'kick',
			usageDelim: ' ',
			description: 'Kicks a user from the server.',
			usage: '<member:member> [reason:string] [...]',
			runIn: ['text'],
			botPerms: ['KICK_MEMBERS']
		});
	}
	async run(message, [member, ...reason]) {
		if (member === message.author) return message.send("You.. can't kick yourself.");
		member = await message.guild.members.fetch(member);

		if (!member) return message.responder.error('That user is not in the guild!');
		if (!member.kickable) throw 'I am unable to kick that user!';
		if (member.roles.highest.position >= message.member.roles.highest.position) return message.responder.error("You can't kick members of the same or higher rank!");

		reason = reason ? reason.join(' ') : `No reason was provided. Use ${message.guild.settings.prefix}reason to update.`;

		await this.client.moderation.kick({
			guild: message.guild,
			target: member.user,
			moderator: message.author,
			reason
		});

		await member.kick(reason);
		await member.user.send(`You were kicked from \`${message.guild.name}\` for ${reason}`).catch(() => null);
		return message.responder.success(`\`${member.user.tag}\` was succesfully kicked.`);
	}

};
