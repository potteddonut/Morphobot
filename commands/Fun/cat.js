const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['randomcat'],
            bucket: 2,
            requiredPermissions: ['EMBED_LINKS'],
            description: 'Shows you a random cat image! Meow.'
        });
        this.API_URL = 'http://shibe.online/api/cats?count=1%22';
    }
    async run(message) {
        const { body: [url] } = await superagent.get(this.API_URL)
            .catch(() => {
                throw `There was an error with shibe.online! Please try again in a bit.`;
            });
        return message.sendEmbed(new MessageEmbed()
            .setAuthor(`Here's your random cat: `)
            .setImage(url)
            .setFooter('Powered by shibe.online!'));
    }
};