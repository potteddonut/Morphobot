const {
	Event,
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Event {

	run(guild) {
		// destroying settings because 
		if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);
		const logChannel = this.client.channels.get("497935017863938048");
		logChannel.sendEmbed(new MessageEmbed()
			.setTitle("Morphobot has left a guild!")
			.setFooter(`Current Guild Count: ${this.client.guilds.size} | Morphobot`).setTimestamp()
			.setColor("#ff0000")
			.setDescription(`Name: **${guild.name}**
			ID: **${guild.id}**
			Members: **${guild.memberCount}**`));

		this.client.user.setActivity(`mb!help | ${this.client.guilds.size} servers`, {
			type: "PLAYING"
		});
	}
};