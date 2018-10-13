const {
	Event
} = require('klasa');

module.exports = class extends Event {

	run(guild) {
		// destroying settings because 
		if (this.client.ready && guild.available && !this.client.options.preserveSettings) guild.settings.destroy().catch(() => null);

	}

};