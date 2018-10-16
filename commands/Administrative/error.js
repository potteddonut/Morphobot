const {
    Command,
    util: {
        codeBlock
    }
} = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            permissionLevel: 10,
            aliases: ["errorcode"],
            description: "Returns details of an error via a generated error code."
        })
    }
    async run(message, [code]) {
        const x = await this.client.providers.default.get("errors", code);
        if (!x) throw "That error code doesn't exist!";
        return message.sendMessage(codeBlock("js", x || x.error));
    }
}