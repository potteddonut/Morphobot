const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ddg', 'lookup'],
            cooldown: 5,
            permLevel: 0,
            description: 'Searches for a query on DuckDuckGo.',
            usage: '<query:str>'
        });
    }
    async run(msg, [query]) {
        const { body } = await superagent.get(`https://api.duckduckgo.com/?q=${query}&format=json`)
            .catch(() => {
                throw "I was unable to find any results that query.";
            });
        const result = JSON.parse(body);
        const [topic] = result.RelatedTopics;
        if (!topic) throw "I was unable to find any results for that query.";
        const embed = await new MessageEmbed()
            .setColor(msg.member.roles.highest.color)
            .setURL(topic.FirstURL)
            .setThumbnail(result.Image ? result.Image : topic.Icon.URL)
            .setTitle(result.Heading)
            .setDescription(result.Abstract ? result.Abstract : topic.Text);
        return msg.responder.success(`I found the best result for your query, ${msg.author}!`, { embed: embed });
    }
}