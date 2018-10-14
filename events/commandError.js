const {
    Event
} = require('klasa');

/*
module.exports = class extends Event {
	run(message, command, params, error) {
		const r = this.client.providers.default;
		if (error instanceof Error) this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
		if (error.message) message.sendCode('JSON', error.message).catch(err => this.client.emit('wtf', err));
		else message.sendMessage(error).catch(err => this.client.emit('wtf', err));
	}
};
*/

module.exports = class extends Event {
    async run(message, command, params, error) {
        const r = this.client.providers.default;
        if (error.message && error instanceof Error) {
            this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
            const code = new Date().getTime().toString(36);
        }
    }
}