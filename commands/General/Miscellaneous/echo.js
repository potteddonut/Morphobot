const {
  Command
} = require("klasa");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      permissionLevel: 5,
      runIn: ["text"],
      description: "Make the bot repeat / send a message.",
      usage: "[channel:channel] <message:string>[...]",
      usageDelim: " "
    });
  }
  async run(message, [channel = message.channel, ...text]) {
    text = text.join(this.usageDelim);
    if (channel.guild !== message.guild)
      throw "You can't echo in other servers!";
    if (!channel.postable) throw "I can't echo in that channel.";
    return channel.send(text).catch(this.client.console.error.bind(this));
  }
};