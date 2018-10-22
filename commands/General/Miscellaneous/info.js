const {
	Command
} = require('klasa');
const {
	MessageEmbed
} = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['details', 'what'],
			guarded: true,
			description: language => language.get('COMMAND_INFO_DESCRIPTION')
		});
	}

	async run(message) {
		message.channel.sendEmbed(new MessageEmbed()
			.setAuthor(`Morphobot is a bot written in discord.js and built on the Klasa framework.`, this.client.user.displayAvatarURL())
			.addField("How do I use the bot?", `Using \`${message.guild.settings.prefix}help\` will send you a list of usable commands to you in DMs. Ensure that Morphobot has the permissions to do so. Take note that it only displays commands that you have access to. You can mention the bot to view the current prefix.`)
			.addField("What does Morphobot specialize in?", `Although Morphobot does expect to turn out to be a well-designed and reliable moderation bot, we are currently trying our best to deliver to you a plethora of well-balanced features along with the bot. Do look out for updates to the bot, which often come with new features!`)
			.addField("Where can I receive support?", `You can receive support from Morphobot Staff via our support server. We have an invite to the lounge that you can access via \`${message.guild.settings.prefix}invite.\``)
			.setColor(message.member.displayHexColor)
			.setFooter(`Morphobot, by Morphoxeris#1111`).setTimestamp());
	}

};