const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
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
        console.log(oxford_app_id, oxford_app_key);
        const { res: lookup } = await superagent.get(baseURL + encodeURIComponent(word)).set('app_id', oxford_app_id).set('app_key', oxford_app_key).catch(() => null);
        if (!lookup || !lookup.results) throw "Unknown word.";
        const res = lookup.results[0];
        const definitions = res.lexicalEntries.map(obj => `\`[${obj.lexicalCategory}]\` **${obj.text}** (${obj.pronunciations[0].phoneticSpelling})\n _${obj.entries[0].senses[0].definitions[0]}_`)
        return msg.channel.sendEmbed(new MessageEmbed()
            .setTitle(`${res.lexicalEntries.length} result${res.lexicalEntries.length !== 1 ? 's' : ''} for ${res.id}:`)
            .setDescription(definitions.join('\n\n'))
            .setColor(msg.guild ? msg.member.displayColor : 'RANDOM'));
    }
};
