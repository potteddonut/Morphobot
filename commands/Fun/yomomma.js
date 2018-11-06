const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['yomoma'],
            description: 'Outputs a yo momma joke.'
        });
    }
    async run(msg) {
        const joke = await fetch('https://api.yomomma.info')
            .then(response => response.json())
            .then(body => body.joke);
        return msg.sendMessage(`📢 ${joke}`);
    }
}