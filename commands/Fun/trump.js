const { Command } = require('klasa');
const superagent = require('superagent');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            bucket: 2,
            description: "Ever wanted to be Trump? Good for you.",
            requiredPermissions: ['ATTACH_FILES'],
            usage: '[text:str]'
        });
    }
    async run(msg, [text]) {
        if (!text) return msg.responder.error('You need to provide some text for Trump to tweet!');
        await msg.sendMessage("Making the president tweet... hold up!")
        const url = new URL('https://nekobot.xyz/api/imagegen');
        url.search = new URLSearchParams([
            ['type', 'trumptweet'],
            ['text', text]
        ]);
        const { body } = await superagent.get(url.href)
            .catch(() => msg.responder.error('An unexpected error occured with the API. Try again in a bit!'));
        return msg.channel.sendFile(body.message);
    }
};