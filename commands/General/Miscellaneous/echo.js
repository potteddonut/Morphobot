const { Command } = require("klasa");
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 5,
      runIn: ["text"],
      description: "Make the bot repeat / send a message.",
      usage: "[channel:channel] <message:...string>",
      usageDelim: " "
    });
  }
  async run(message) {
    if (message.channel.guild !== message.guild)
      throw "You can't echo in other servers.";
    if (!message.channel.postable) throw "I can't echo in that channel.";
    return message.channel.send(
      message.content.slice(this.client.options.prefix.length)
    );
  }
};
