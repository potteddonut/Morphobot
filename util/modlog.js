const {
    MessageEmbed
} = require('discord.js');
module.exports = class ModLog {
    constructor(guild) {
        this.guild = guild;
        this.client = guild.client;

        this.type = null;
        this.user = null;
        this.moderator = null;
        this.reason = null;
        this.case-null;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setUser(user) {
        this.user = {
            id: user.id,
            tag: user.tag
        };
        return this;
    }
    setModerator(user) {
        this.moderator = {
            id: user.id,
            tag: user.tag,
            avatar: user.displayAvatarURL()
        }
        return this;
    }
    setReason(reason = null) {
        if (reason instanceof Array) reason = reason.join(' ');
        this.reason = reason;
        return this;
    }

    async send() {
        const channel = this.guild.channels.get(this.guild.settings.get("modlogs").id);
        if (!channel) throw "The specified mod-log channel does not exist.";
        await this.getCase();
        return channel.send({
            embed: this.embed
        })
    }

    get embed() {
        const embed = new MessageEmbed()
            .setAuthor(this.moderator.tag, this.moderator.avatar)
            .setColor(ModLog.colour(this.type))
            .setDescription([
                `**Type**: ${this.type[0].toUpperCase() + this.type.slice(1)}`,
                `**User**: ${this.user.tag} (${this.user.id})`,
                `**Reason**: ${this.reason || `No reason specified. Use \`${this.guild.settings.prefix}reason ${this.case}\` to claim this log.`}`
            ])
            .setFooter(`Case Number ${this.case}`)
            .setTimestamp();
        return embed;
    }

    async getCase() {
        this.case = this.guild.settings.get('modlogs').length;
        return this.guild.settings.update('modlogs', this.pack);
    }

    get pack() {
        return {
            type: this.type,
            user: this.user.id,
            moderator: this.moderator.id,
            reason: this.reason,
            case: this.case
        };
    }

    colour(type) {
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
};