const {
    Command
} = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: "Stabs someone through text.",
            usage: "<user:username>"
        });
    }
    async run(message, [member]) {
        member = await message.guild.members.fetch(member);
        const responses = [
            `Oh no! ${message.author} just stabbed ${member.user.username}!`,
            `:scream: ${message.author} just shanked ${member.user.username}!`
        ];
        return message.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
}