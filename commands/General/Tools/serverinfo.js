const {
	Command,
	Timestamp
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			runIn: ['text'],
			aliases: ['sinfo', 'server', 'guild'],
			description: 'Returns information about the server.'
		});
		this.verificationLevels = [
			'None',
			'Low',
			'Medium',
			'(╯°□°）╯︵ ┻━┻',
			'┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
		];
		this.filterLevels = [
			'Off',
			'No Role',
			'Everyone'
		];
		this.timestamp = new Timestamp('d MMMM YYYY');
	}
	run(message) {
		return message.sendEmbed(new MessageEmbed()
			.setColor(0x00AE86)
			.setThumbnail(message.guild.iconURL())
			.addField('❯ Name', message.guild.name, true)
			.addField('❯ ID', message.guild.id, true)
			.addField('❯ Creation Date', this.timestamp.display(message.guild.createdAt), true)
			.addField('❯ Region', message.guild.region, true)
			.addField('❯ Explicit Filter', this.filterLevels[message.guild.explicitContentFilter], true)
			.addField('❯ Verification Level', this.verificationLevels[message.guild.verificationLevel], true)
			.addField('❯ Owner', message.guild.owner ? message.guild.owner.user.tag : 'None', true)
			.addField('❯ Members', message.guild.memberCount, true)
			.addField('❯ Bot Users', message.guild.members.filter(memb => memb.user.bot).size, true));
	}

};
