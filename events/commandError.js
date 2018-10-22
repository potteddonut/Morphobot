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
        const db = this.client.providers.default;
        if (error.message && error instanceof Error) {
            this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
            const code = Date.now().toString(36);
            await db.create('errors', code, error.stack || error);
            return message.sendMessage(`An unexpected error occured! Please contact the developers with the error code \`${code}\`.`)
        } else {
            message.sendMessage(error).catch(err => this.client.emit('wtf', err));
        }
        return null;
    }
};