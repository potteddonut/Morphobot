const {
    Command
} = require('klasa');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['rank'],
            guarded: true,
            description: "Displays your permission level in the message guild."
        });
    }

    async run(message) {
        let perm;
        for (let i = 10; i >= 0; i--) {
            if (!await message.hasAtLeastPermissionLevel(i)) continue;
            perm = i;
            break;
        }

        const levels = {
            0: "Morphobot User",
            5: "Server Moderator",
            6: "Server Administrator",
            7: "Server Owner",
            8: "Morphobot Staff",
            9: "Morphobot Administrator",
            10: "Morphobot Developer"
        }

        return message.sendMessage(`Your permssion level is **${perm}** - ${levels[perm]}.`);
    }
};