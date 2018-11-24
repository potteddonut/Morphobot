const {
	Command
} = require('klasa');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			aliases: ['sr', 'giverole'],
			usage: '<member:username> <role:rolename>',
			usageDelim: ' ',
			requiredPermissions: ['MANAGE_ROLES'],
			description: 'Assigns a role.'
		});
	}
	async run(message, [member, role]) {
		member = await message.guild.members.fetch(member);
		if (member.roles.has(role.id)) return message.send('The specified user already has that role.');
		if (role.position >= message.member.roles.highest.position) throw "That role's position is higher than your highest role's position, thus I cannot assign the role.";
		if (role.position >= message.guild.me.roles.highest.position) {
			throw "That role's position is higher than or equal to my highest role, thus I cannot assign it.";
		}

		return member.roles.add(role, `${message.author.tag} assigned role using the -addrole command.`)
			.then(() => message.responder.success(`Succesfully assigned role \`${role.name}\` to \`${member.user.tag}\``))
			.catch(error => this.client.emit('error', error));
	}

};
