const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Changes the nickname of a user.',
            permissionLevel: 5,
            aliases: ['nick'],
            runIn: ['text'],
            requiredPermissions: ['MANAGE_NICKNAMES'],
            usage: '[user:member] <nickname:str>[...]',
            usageDelim: ' '
        });
    }
    async run(message, [user = message.member, ...newNickName]) {
        newNickName = newNickName.join(this.usageDelim);
        await user.setNickname(newNickName)
            .then(() => message.send(`Succesfully set **${user.user.tag}**'s nickname to **${newNickName}**.`))
            .catch(() => {
                throw "I can't change that user's nickname. Make sure their role is below mine.";
            });
    }

};