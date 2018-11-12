const {
	Command,
	util
} = require('klasa');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			// dev
			permissionLevel: 10,
			aliases: ['errorcode'],
			description: 'Returns details of an error via a generated error code.',
			usage: '<code:string>'
		});
	}
	async run(message, [code]) {
		const error = await this.client.providers.default.get('errors', code).catch(() => null);
		if (!error) throw message.responder.error('That error code was not found.');
		return message.sendMessage(util.codeBlock('js', error.error));
	}

};
