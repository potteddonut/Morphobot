const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: 'Returns a random dog fact.'
		})
	}
	async run(msg) {
		const fact = await fetch(`http://dog-api.kinduff.com/api/facts?number=1`)
			.then(response => response.json())
			.then(body => body.facts[0]);
		return msg.sendMessage(`**Random dogfact** - ${fact}`)
	}
}