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
        const _msg = superagent.get('https://www.whatthecommit.com/index.txt%27').then(r => r.text);
        msg.send(`Here's your random commit message - ${_msg}`);
    }
};