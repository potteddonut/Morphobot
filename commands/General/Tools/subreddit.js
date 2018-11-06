const { Command } = require('klasa');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['sub'],
            description: 'Returns information on a subreddit, via reddit.com',
            usage: '<subredditName:str>'
        });
        this.errorMessage = `An unexpected error occured. Reddit may be down, or the subreddit doesn't exist.`;
    }
    async run(msg, [subredditName]) {
        const subreddit = await fetch(`https://www.reddit.com/r/${subredditName}/about.json`)
            .then(response => response.json())
            .then(body => {
                if (body.kind === 't5') return body.data;
                throw `That subreddit doesn't exist!`;
            })
            // .catch(() => { throw this.errorMessage });
            .catch((error) => { throw error })

        return msg.sendEmbed(new MessageEmbed()
            .setTitle(subreddit.title)
            .setDescription(subreddit.public_description)
            .setURL(`https://www.reddit.com/r/${subredditName}`)
            .setColor(6570404)
            .setThumbnail(subreddit.icon_img)
            .setImage(subreddit.banner_img)
            .addField('Subscribers', subreddit.subscribers.toLocaleString(), true)
            .addField('Users Active', subreddit.accounts_active.toLocaleString(), true));
    }
};