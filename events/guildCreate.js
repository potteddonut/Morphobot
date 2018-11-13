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
		this.timestamp = new Timestamp('d MMMM YYYY');
	}
	run(guild) {
		if (!guild.available) return;
		if (this.client.settings.guildBlacklist.includes(guild.id)) {
			guild.leave();
			this.client.emit('warn', `Blacklisted guild detected: ${guild.name} [${guild.id}]`);
		}
		const logChannel = this.client.channels.get('497935017863938048');
		logChannel.sendEmbed(new MessageEmbed()
			.setTitle('Morphobot has joined a new guild!')
			.setFooter(`Current Guild Count: ${this.client.guilds.size} | Morphobot`).setTimestamp()
			.setColor('#00ff00')
			.setDescription(`Name: **${guild.name}**
			ID: **${guild.id}**
			Members: **${guild.memberCount}**`));

		this.client.user.setActivity(`mb!help | ${this.client.guilds.size} servers`, {
			type: 'PLAYING'
		});
	}

};
