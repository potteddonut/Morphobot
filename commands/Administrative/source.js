const { Command } = require('klasa');
const { Util: { escapeMarkdown } } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Returns source code from the bot.',
            permissionLevel: 10,
            alises: ['src', 'sourcecode', 'code'],
            guarded: true,
            usage: '<piece:piece>'
        });
    }
    async run(msg, [piece]) {
        return msg.send(escapeMarkdown(piece.constructor.toString(), true), {
            split: true,
            code: 'js'
        });
    }
};