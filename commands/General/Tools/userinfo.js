const {
    Command,
    Timestamp
} = require("klasa");
const {
    MessageEmbed
} = require("discord.js");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ui', 'uinfo'],
            description: "Get information of a user in the guild.",
            usage: "[Member:member]"
        });
        this.statuses = {
            online: "<:online:500231634302271488>",
            offline: "<:offline:500231634105401355>",
            dnd: "<:dnd:500231634277367808>",
            idle: "<:away:500231633933434882>"
        }
        this.timestamp = new Timestamp("d MMMM YYYY");
    }
    run(message, [member = message.member]) {
        return message.sendEmbed(new MessageEmbed()
            .setColor(member.displayHexColor || 0xFFFFFF)
            .setThumbnail(member.user.displayAvatarURL())
            .addField('❯ Name', member.user.tag, true)
            .addField('❯ ID', member.id, true)
            .addField('❯ Discord Join Date', this.timestamp.display(member.user.createdAt), true)
            .addField('❯ Server Join Date', this.timestamp.display(member.joinedTimestamp), true)
            .addField('❯ Status', this.statuses[member.presence.status], true)
            .addField('❯ Playing', member.presence.activity ? member.presence.activity.name : 'N/A', true)
            .addField('❯ Highest Role', member.roles.size > 1 ? member.roles.highest.name : 'None', true)
            .addField('❯ Hoist Role', member.roles.hoist ? member.roles.hoist.name : 'None', true));
    }
}