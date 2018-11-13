const {
	Command
} = require('klasa');
const fetch = require('node-fetch');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['hb'],
			description: 'Upload pieces of code or text to hastebin.com.',
			usage: '<code:str>'
		});
	}
	async run(message, [code]) {
		const key = await fetch('https://hastebin.com/documents', {
			method: 'POST',
			body: code
		})
			.then(response => response.json())
			.then(body => body.key);
		return message.sendMessage(`Your generated link is - https://hastebin.com/${key}`);
	}

};
