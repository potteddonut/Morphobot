const {
	Command
} = require('klasa');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			permissionLevel: 5,
			aliases: ['adscheck'],
			runIn: ['text']
		});
	}
	run(message) {
		const found = message.guild.members.filter(member => member.displayName.includes('discord.gg'));
		message.channel.send(`\`\`\`\n${found.map(member => member.user.tag).join('\n')}\n\`\`\``);
	}

};
