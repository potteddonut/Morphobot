const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
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
		if (!found) return msg.responder.error('There are no members with any advertisements in their names.');
		// message.channel.send(`\`\`\`\n${found.map(member => member.user.tag).join('\n')}\n\`\`\``);
		message.sendEmbed(new MessageEmbed()
			.setTitle('Server Members with invites in their name -')
			.setDescription(found.map(member => member.user.tag).join('\n'))
			.setFooter('Morphobot Adcheck').setTimestamp()
			.setColor(message.member.displayHexColor));
	}

};
