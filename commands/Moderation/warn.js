const {
    Command
} = require("klasa");

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 5,
            name: "warn",
            runIn: ["text"],
            usageDelim: " ",
            usage: "<member:member> <reason:string> [...]",
            description: "Warns a server member."
        });
    }

    async run(message, [member, ...reason]) {
        reason = reason.length > 0 ? reason.join(' ') : null;

        if (member.roles.highest.position >= message.member.roles.highest.position) {
            this.client.moderation.warn({
                guild: message.guild,
                target: member.user,
                moderator: message.author,
                reason
            })
            await member.user.send(`You have been warned in \`${message.guild.name}\` for \`${reason}\``).catch(() => null);
        }
        return message.send(`\`${member.user.tag}\` has been succesfully warned.`)
    }
}