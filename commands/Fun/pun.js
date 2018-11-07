const { Command } = require('klasa');
const fetch = require('node-fetch');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, { description: 'Generates a random pun.' });
    }
    async run(msg) {
        const { body } = await fetch('https://icanhazdadjoke.com')
            .then(result => result.json());
        return msg.sendMessage(body.joke.length ? `Random pun: **${body.joke}**` : 'Something went wrong. Try again in a bit.')
    }
};   