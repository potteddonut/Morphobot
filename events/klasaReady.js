const {
    Event
} = require("klasa")

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            enabled: true,
            once: true //then this link for once
        });
    }

    async run() {
        this.client.user.setActivity(`mb!help | ${this.client.guilds.size} servers`, {
            type: "PLAYING"
        });
    }
};