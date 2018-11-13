const {
	Command
} = require('klasa');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Creates a new reminder.',
			extendedHelp: 'For example, to set a reminder that goes off in 10 minutes, you will do - mb!remindme 10m, do this.',
			usage: '<when:time> <text:...str>',
			usageDelim: ', '
		});
	}
	async run(message, [when, text]) {
		const reminder = await this.client.schedule.create('reminder', when, {
			data: {
				channel: message.channel.id,
				user: message.author.id,
				text
			}
		});
		return message.sendMessage(`Okay, reminder created with ID: \`${reminder.id}\``);
	}

};
