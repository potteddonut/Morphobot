const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const snek = require('snekfetch');
const baseURL = 'https://od-api.oxforddictionaries.com/api/v1/entries/en/';
const { config: { api_keys: { oxford_app_id, oxford_app_key } } } = require(`${process.cwd()}/config`);


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Defines a word in the Oxford Dictionary.',
            aliases: ['def'],
            usage: '<word:str>'
        });
    }
    async run(msg, [word]) {
        const get = await snek.get(baseURL + encodeURIComponent(word), { headers: { app_id: oxford_app_id, app_key: oxford_app_key } }).catch(() => null);
        if (!get || !get.body || !get.body.results) return msg.responder.error('Unknown word');
        const res = get.body.results[0];
        const definitions = res.lexicalEntries
            .map(obj => [
                `​\`​[${obj.lexicalCategory}]\`​ **${obj.text}** (${obj.pronunciations[0].phoneticSpelling})`,
                `​${obj.entries[0].senses[0].definitions
                    ? obj.entries[0].senses[0].definitions[0]
                    : obj.entries[0].senses[0].short_definitions[0]}`,
                obj.entries[0].senses[0].examples.map(ex => `​_- ${ex.text}_`).join('\n')
            ].join('\n'));
        return msg.sendEmbed(new MessageEmbed()
            .setTitle(`${res.lexicalEntries.length} results${res.lexicalEntries.length !== 1 ? 's' : ''} for ${res.id}:`)
            .setDescription(definitions.join('\n\n'))
            .setColor(msg.guild ? msg.member.displayColor : 'RANDOM'));
    }
};
