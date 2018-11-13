const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['yomoma'],
			description: 'Outputs a yo momma joke.',
			extendedHelp: 'Disclaimer: Some yo momma jokes will NOT go through the bot succesfully.'
		});
	}
	async run(msg) {
		const joke = await fetch('https://api.yomomma.info')
			.then(response => response.json())
			.then(body => body.joke);
		return msg.sendMessage(`📢 ${joke}`);
	}

};
