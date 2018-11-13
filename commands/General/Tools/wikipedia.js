const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['wiki'],
            description: 'Finds a wikipedia article by the query title.',
            usage: '<query:str>'
        });
    }
    async run(msg, [query]) {
        const article = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
            .then(response => response.json())
            .catch(() => { throw msg.responder.error("Couldn't find a wiki article by that title.") });

        msg.sendEmbed(new MessageEmbed()
            .setColor(4886754)
            .setThumbnail((article.thumbnail && article.thumbnail.source) || 'https://i.imgur.com/fnhlGh5.png')
            .setURL(article.content_urls.desktop.page)
            .setTitle(article.title)
            .setDescription(article.extract));
    }
};