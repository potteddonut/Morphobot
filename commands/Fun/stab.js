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
    run(message, [member]) {
        member = message.guild.members.fetch(member);
        const responses = [
            `Oh no! ${message.author} just stabbed ${member.user.name}!`,
            `:scream: ${message.author} just shanked ${member.user.name}!`
        ];
        return message.sendMessage(responses[Math.floor(Math.random() * responses.length)]);
    }
}