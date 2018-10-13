const {
	Event,
	Timestamp
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Event {

	constructor(...args) {

		super(...args);

		this.timestamp = new Timestamp("d MMMM YYYY");
	}

	run(guild) {
		if (!guild.available) return;
		if (this.client.settings.guildBlacklist.includes(guild.id)) {
			guild.leave();
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
		const logChannel = this.client.guilds.get("488337189831442432").channels.get("497935017863938048");
		logChannel.sendEmbed(new MessageEmbed()
			.setColor("#00ff00")
			.addField(`Name: **${guild.name}**`)
			.addField(`ID: **${guild.id}**`)
			.addField(`Member Count: ${guild.memberCount - guild.members.filter(m => m.user.bot).size}`)
			.setFooter(`Morphobot | ${this.timestamp}`))
	}

};