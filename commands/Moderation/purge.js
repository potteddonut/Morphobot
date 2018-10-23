const {
    Command
} = require("klasa");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'purge',
            permissionLevel: 5,
            requiredPermissions: ["MANAGE_MESSAGES"],
            aliases: ["p", "prune"],
            runIn: ["text"],
            usage: "[limit:integer] [link|invite|bots|embed|user:user]",
            usageDelim: ' '
        })
    }
    async run(message, [limit = 50, filter = null]) {
        let messages = await message.channel.messages.fetch({
            limit: 100
        });
        if (!messages || messages.size === 0) throw "I am unable to delete the messages.";
        if (filter) {
            const user = typeof filter !== "string" ? filter : null;
            const type = typeof filter === "string" ? filter : "user";
            messages = messages.filter(this.getFilter(message, type, user));
        };
        messages = messages.array().slice(0, limit);
        await message.channel.bulkDelete(messages);
        return message.send(`Succesfully deleted ${messages.length} messages, out of ${limit}.`)
            .then(message => message.delete({
                timeout: 3000
            }));
    }
    // with credit to Soumil07/Apex-Bot
    getFilter(message, filter, user) {
        switch (filter) {
            case "link":
                return mes => /https?:\/\/[^ /.]+\.[^ /.]+/.test(mes.content);
            case 'invite':
                return mes => /(https?:\/\/)?(www\.)?(discord\.(gg|li|me|io)|discordapp\.com\/invite)\/.+/.test(mes.content);
            case 'bots':
                return mes => mes.author.bot;
            case 'user':
                return mes => mes.author.id === user.id;
            case 'embed':
                return mes => mes.embeds.length > 0;
            default:
                return () => true;
        }
    }
}