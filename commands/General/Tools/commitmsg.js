const { Command } = require('klasa');
const superagent = require('superagent');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Returns a random commit message.',
            aliases: ['commit'],
        });
    }
    async run(msg) {
        // superagent.get(URL) returns a promise, so we need to handle it,
        // which I have done by converting r into text.
        // but why is it returning [object Promise] ?
        await superagent.get('https://whatthecommit.com/index.txt')
            .then(r => r.text)
    }
};