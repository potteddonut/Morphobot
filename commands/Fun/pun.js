const { Command } = require('klasa');
const fetch = require('node-fetch');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, { description: 'Generates a random pun.' });
    }
    async run(msg) {
        const { body } = await fetch('https://icanhazdadjoke.com');
        return msg.sendMessage(body.length ? `Random pun: **${body}**` : 'Something went wrong. Try again in a bit.')
    }
};   