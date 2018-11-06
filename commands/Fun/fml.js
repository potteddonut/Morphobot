const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { description: 'Grabs a random FML story.' });
    }
    async run(msg) {
        const root = await fetch('http://www.fmylife.com/random')
            .then(result => result.text())
            .then(HTMLParser.parse);
        const article = root.querySelector('.block a');
        const downdoot = root.querySelector('.vote-down');
        const updoot = root.querySelector('.vote-up');

        if (article.childNodes[0].text.length < 5) {
            return msg.sendMessage('Today, something went wrong, so you\'ll have to try again in a bit. FML.');
        }

        return msg.sendEmbed(new MessageEmbed()
            .setTitle(`Requested by ${msg.author.tag}`)
            .setAuthor('FML Stories')
            .setColor(msg.member.displayColor)
            .setTimestamp()
            .setDescription(`_${article.childNodes[0].text}\n\n_`)
            .addField('I agree, your life sucks', updoot.childNodes[0].text, true)
            .addField('You deserved it:', downdoot.childNodes[0].text, true));
    }
};