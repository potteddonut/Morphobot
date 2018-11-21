const { Client } = require('klasa');
const { config, token } = require('./config');
const { Collection } = require('discord.js');
const ModLog = require('./util/modlog');
const Responder = require('./lib/Responder');
const IdioticApi = require('./lib/IdioticApiClient');

// "488337189831442432" morphobot lounge
// "488337556224737290" staff role

// goat, jake
const mbStaff = ['147039883372789761', '116293018742554625'];
const mbAdmin = []
// stitch (soumil07), morph, ladybug
const mbDev = ['292571834770128906', '234558143051464704', '292690616285134850'];

// Morphobot's custom permission level system and configuration.
// The mylevel command iterates through these levels from 10 to 0 to check which permission level the author has.
Client.defaultPermissionLevels
	.add(5, (client, message) => message.member && message.member.roles.has(message.guild.settings.get('modRole')), { fetch: true })
	.add(6, (client, message) => message.member && message.member.roles.has(message.guild.settings.get('adminRole')), { fetch: true })
	.add(7, (client, message) => message.guild && message.guild.ownerID === message.author.id, { fetch: true })
	.add(8, (client, message) => mbStaff.includes(message.author.id), { fetch: true })
	.add(9, (client, message) => mbAdmin.includes(message.author.id), { fetch: true })
	.add(10, (client, message) => mbDev.includes(message.author.id), { break: true });

Client.defaultGuildSchema

	// SettingsGateway key types
	// any, boolean, categoryChannel, channel (accepts any kind of channel),
	// command (Command instance, resolves a command.), float, guild, integer,
	// language (Language instance, resolves a language.), number, role, string, textchannel,
	// url, user, voicechannel.

	// Moderation settings go here.
	.add('modlogs', 'TextChannel')
	.add('modRole', 'Role')
	.add('adminRole', 'Role')
	.add('muteRole', 'Role')
	.add('antiinvite', 'boolean', {
		default: false
	});

// this uses an .extend method on Structures, a discord.js feature, to make our responder usable with message.
const { Structures } = require('discord.js');
Structures.extend('Message', Message => {
	class MbMessage extends Message {

		constructor(...args) {
			super(...args);
			this.responder = new Responder(this);
		}

	}
	return MbMessage;
});

// client declaration (?)
class Morphobot extends Client {

	constructor(...args) {
		super(...args);
		this.moderation = new ModLog(this);
		this.usedCommands = new Collection();
		this.idioticAPI = new IdioticApi(config.api_keys.idiotic_api, { dev: true });
	}

}

// logs in to the bot account
new Morphobot(config).login(token);
