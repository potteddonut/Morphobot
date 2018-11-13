const {
	Duration
} = require.main.exports;
const {
	MessageEmbed
} = require('discord.js');

module.exports = class ModLog {

	constructor(client) {
		this.client = client;
	}
	async log(data) {
		const {
			type,
			guild,
			target,
			moderator,
			reason,
			time,
			warnCount
		} = data;
		const {
			default: provider
		} = this.client.providers;
		const caseID = await provider.get('modlogs', guild.id).then(raw => raw && raw.logs ? raw.logs.length : 0) + 1;
		data.caseID = caseID;
		let raw = await provider.get('modlogs', guild.id);
		if (!raw) {
			await provider.create('modlogs', guild.id, {
				logs: []
			});
			raw = await provider.get('modlogs', guild.id);
		}
		raw.logs.push({
			type,
			case: caseID,
			reason,
			moderator: {
				avatar: moderator.displayAvatarURL(),
				tag: moderator.tag,
				id: moderator.id
			}
		});
		await provider.update('modlogs', guild.id, raw);
		if (guild.settings.modlogs && guild.channels.get(guild.settings.get('modlogs')).embedable) {
			return this.send({
				type,
				caseID,
				guild,
				target,
				moderator,
				reason,
				time,
				warnCount
			});
		}
		return null;
	}
	async kick(data) {
		return this.log({
			type: 'kick',
			...data
		});
	}
	async softban(data) {
		return this.log({
			type: 'softban',
			...data
		});
	}
	async warn(data) {
		const warnCount = await this.client.providers.default.get('modlogs', data.guild.id)
			.then(raw => raw && raw.logs && raw.logs.length ? raw.logs.filter(log => log.type === 'warn').length : 0);
		return this.log({
			type: 'warn',
			warnCount,
			...data
		});
	}
	async ban(data) {
		if (data.time) {
			await this.client.schedule.create('unban', data.time, {
				data: {
					guild: data.guild.id,
					user: data.target.id
				}
			});
		}
		return this.log({
			type: 'ban',
			...data
		});
	}
	async send({
		type,
		caseID,
		guild,
		target,
		moderator,
		reason,
		time,
		warnCount
	}) {
		const output = [
			`**Action**: ${type}`,
			`**User**: ${target.tag} (${target.id})`,
			`**Reason**: ${reason || `No reason specified. Use ${guild.settings.prefix}reason to specify a reason.`}`
		];
		if (time) output.push(`**Expires**: ${Duration.toNow(time)}`);
		if (warnCount) output.push(`**Warnings**: ${warnCount++}`);
		const embed = new MessageEmbed()
			.setAuthor(moderator.tag, moderator.displayAvatarURL())
			.setColor(this.color(type))
			.setDescription(output.join('\n'))
			.setFooter(`Case ${caseID}`)
			.setTimestamp();
		return guild.channels.get(guild.settings.modlogs).send({
			embed
		});
	}

	color(type) {
		switch (type) {
			case 'ban':
				return 16724253;
			case 'unban':
				return 1822618;
			case 'warn':
				return 16564545;
			case 'kick':
				return 16573465;
			case 'softban':
				return 15014476;
			case 'mute':
				return '#0047AB';
			default:
				return 16777215;
		}
	}

};
