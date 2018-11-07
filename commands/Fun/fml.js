// Credits -
// dirigeants/klasa-pieces
// Soumil07/Apex-Bot

const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const HTMLParser = require('fast-html-parser');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, { description: 'Grabs a random FML story.' });
    }
    async run(msg) {

        await msg.sendMessage("Fetching you a random FML entry.. this may take a while, so.. FML!")

        const root = await fetch('http://www.fmylife.com/random')
            .then(result => result.text())
            .then(HTMLParser.parse);

        const article = root.querySelector('.block a');
        const downdoot = root.querySelector('.vote-down');
        const updoot = root.querySelector('.vote-up');
        const href = root.querySelector('.panel-content p.block a');
        const card = root.querySelector('.panel-content div.votes span.vote div');
        const signature = root.querySelector('.panel-content div.votes span.vote div');
        const link = `http://www.fmylife.com${href.rawAttrs.replace(/^href=|"/g, '')}`;
        const cardId = card.rawAttrs.replace(/\D/g, '');
        let signatureDisplay = 'Author and date of this FML unknown';
        if (signature.childNodes.length === 1) {
            signatureDisplay = signature.childNodes[0].text;
        } else if (signature.childNodes.length === 3) {
            signatureDisplay = signature.childNodes[0].text.replace('-', '/') + signature.childNodes[2].text.replace('/', '');
        }

        if (article.childNodes[0].text.length < 5) {
            return msg.sendMessage('Today, something went wrong, so you\'ll have to try again in a bit. FML.');
        }

        return msg.sendEmbed(new MessageEmbed()
            .setTitle(`FML #${cardId}`)
            .setURL(link)
            .setColor(165868)
            .setThumbnail('http://i.imgur.com/5cMj0fw.png')
            .setFooter(signatureDisplay)
            .setDescription(`_${article.childNodes[0].text}\n\n_`)
            .addField('I agree, your life sucks', updoot.childNodes[0].text, true)
            .addField('You deserved it:', downdoot.childNodes[0].text, true));
    }
};