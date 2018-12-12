const {
	Task
} = require('klasa');
module.exports = class extends Task {

	async run({
		channel,
		user,
		text
	}) {
		const _user = message.guild.users.get(user);
		if (_user) await _user.send(`<@${user}>, You wanted me to remind you: ${text}`);
	}

};
