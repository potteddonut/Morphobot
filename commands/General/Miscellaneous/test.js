const { Command } = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }
    run(message) {
        message.responder.success('this works');
        message.responder.error('this works too');
    }
};