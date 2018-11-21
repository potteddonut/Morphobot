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
        msg.send(`Here's your random commit message - ${superagent.get('https://whatthecommit.com/index.txt').then(r => r.text)}`);
    }
};