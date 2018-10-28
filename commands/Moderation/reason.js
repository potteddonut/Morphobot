const {
    Command,
    util
} = require('klasa');
const {
    MessageEmbed
} = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            runIn: ['text'],
            aliases: ['updatecase', 'case', 'setreason'],
            permissionLevel: 5,
            description: "Edits / updates the reason of a modlog case.",
            usage: "<case:integer> <reason:string> [...]",
            usageDelim: " ",
            requiredSettings: ['modlogs'],
            requiredPermissions: ["MANAGE_MESSAGES"]
        });
        this.customizeResponse('case', 'Which case would you like to change?');
    }
    async run(message, [selected, ...reason]) {
        reason = reason.length > 0 ? reason.join(this.usageDelim) : null;
        const modlogs = await this.client.providers.default.get("modlogs", message.guild.id).then(data => data || []);
        const log = modlogs.logs[selected - 1];
        if (!log) throw "That's not a valid case number!"

        const channel = message.guild.channels.get(message.guild.settings.get("modlogs"));
        if (!channel) throw "The modlog channel set cannot be accessed!";
        const messages = await channel.messages.fetch({
            limit: 100
        });
        const msg = messages.find(mes => mes.author.id === this.client.user.id && mes.embeds.length > 0 && mes.embeds[0].footer && mes.embeds[0].footer.text === `Case ${selected}`);
        if (msg) { // msg in this case refers to the constant that we defined above.
            const embed = msg.embeds[0];
            const [type, user] = embed.description.split('\n');
            embed.description = [
                type,
                user,
                `**Reason**: ${reason}`
            ].join('\n')
            await msg.edit({
                embed
            });
        } else {
            await message.sendEmbed(new MessageEmbed()
                .setAuthor(log.moderator.tag, log.moderator.avatarURL())
                .setColor(colour(log.type))
                .setDescription([
                    `**Type**: ${log.type}`,
                    `**User**: ${log.user.tag} (${log.user.id})`,
                    `**Reason**: ${reason}`
                ])
                .setFooter(`Case ${selected}`).setTimestamp())
        }
        const oldReason = log.reason;
        modlogs.logs[selected - 1].reason = reason;
        await this.client.providers.default.replace('modlogs', message.guild.id, modlogs);
        return message.send(`Case ${selected} has been succesfully updated. ${util.codeBlock('http', [
            `Old reason: ${oldReason || `Not set.`}`,
            `New reason: ${reason}`
        ].join('\n'))}`);
    }
}

function colour(type) {
    switch (type) {
        case 'ban':
            return 16724253;
        case 'unban':
            return 1822618;
        case 'warn':
            return 16564545;
        case 'kick':
            return 16573465;
        case 'softban':
            return 15014476;
        default:
            return 16777215;
    }
}
