const {
	Event
} = require('klasa');

module.exports = class extends Event {

	async run(message, command, params, error) {
		const db = this.client.providers.default;
		if (error.message && error instanceof Error) {
			this.client.emit('wtf', `[COMMAND] ${command.path}\n${error.stack || error}`);
			const code = Date.now().toString(36);
			await db.create('errors', code, { error: error.stack || error });
			return message.sendMessage(`An unexpected error occured! Please contact the developers with the error code \`${code}\`.`);
		} else {
			message.sendMessage(error).catch(err => this.client.emit('wtf', err));
		}
		return null;
	}

};
