const { MessageEmbed } = require('discord.js');

module.exports = class Responder {

	constructor(message) {
		this.message = message;
	}

	success(content, embed = false, options = {}) {
		return !embed ? this.emoji('success', content, options) :
			this.message.sendEmbed(new MessageEmbed().setColor('#3CXBC7C').setAuthor(this.message.author.username, this.message.author.avatarURL())
				.setDescription(`${EMOJIS.success} ${content}`), options);
	}

	error(content, embed = false, options = {}) {
		return !embed ? this.emoji('error', content, options) :
			this.message.sendEmbed(new MessageEmbed().setColor('#FF0000').setAuthor(this.message.author.username, this.message.author.avatarURL())
				.setDescription(`${EMOJIS.error} ${content}`), options);
	}

	emoji(emoji, content, options = {}) {
		return this.message.send(`${EMOJIS[emoji]} ${content}`, options);
	}

	async awaitNumberedResponse(content, [start, end]) {
		await this.emoji('thinking', content);
		const responses = await this.message.channel.awaitMessages(msg => msg.author.id === this.message.author.id && parseInt(msg.content) && parseInt(msg.content) >= start &&
			Number(msg.content) <= end, { max: 1, time: 30 * 1000 });
		if (!responses.size) return this.error('No options received. Aborted prompt.');
		const response = responses.first();
		return Number(response.content);
	}

};

const EMOJIS = {
	success: '<:checkmark:510449327840296970>',
	error: '<:xmark:510449313449639956>',
	ok: '<:blobthumbs:490397661086744587>',
	notok: '<:blobthumbsdown:490397661417963520>'
};

