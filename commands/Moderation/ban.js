const { Command } = require('klasa');

module.exports = class extends Command {

    constructor(...args) {

        super(...args, {
            name: 'ban',
            aliases: ['banhammer', 'banne'],
            usageDelim: ' ',
            description: 'Bans a user from the server.',
            usage: '<member:member> [reason:string] [...]',
            runIn: ['text'],
            botPerms: ['BAN_MEMBERS'],
            permissionLevel: 4
        });

    }

    async run(msg, [member, ...reason]) {
        // validation
        if (member === msg.author) return msg.responder.error("You can't ban yourself, genius.");
        if (member === this.client.user) return msg.responder.error("You can't make me ban myself either, smartass.");
        member = await msg.guild.members.fetch(member);

        if (!member) return msg.responder.error('That user cannot be found!');
        if (!member.bannable) return msg.responder.error('I am unable to ban that user.');
        if (member.roles.highest.position >= msg.member.roles.highest.position) throw msg.responder.error('I am unable to ban that user. Make sure my highest role is in a higher position than the member.');

        // define reason for modlog.
        reason = reason ? reason.join(' ') : `No reason was provided. Use ${msg.guild.settings.prefix}reason to update.`;

        await this.client.moderation.ban({
            guild: msg.guild,
            target: member.user,
            moderator: msg.author,
            reason
        });

        await member.ban(reason);
        await member.user.send(`You were banned from \`${msg.guild.name}\` for ${reason}`).catch(() => null);
        return msg.responder.success(`\`${member.user.tag}\` was succesfully banned.`);

    }
};