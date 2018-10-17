// starting out with no case number warn system, which fully depends on logs to track a user's
// moderation history.
const {
    Command
} = require("klasa");
const ModLog = require('../../util/modlog');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 5,
            aliases: ['warnuser'],
            runIn: ["text"],
            usageDelim: " ",
            usage: "<member:member> <reason:string> [...]",
            description: "Warns a server member."
        });
    }
    async run(message, [member, ...reason]) {
        reason = reason.length > 0 ? reason.join(' ') : null;
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.send(`That user has either the same or a higher role than yours!`)
        }
        if (message.guild.settings.get("modlogs")) {
            new ModLog(message.guild)
                .setType("warn")
                .setModerator(message.author)
                .setUser(member.user)
                .setReason(reason)
                .send();
        }
        return message.send(`\`${member.user.tag}\` has been succesfully warned.`)
    }
}