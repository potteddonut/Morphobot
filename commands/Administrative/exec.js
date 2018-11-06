const { Command, util: { exec, codeBlock } } = require('klasa');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            alises: ['execute', 'console'],
            description: 'Executes commands in the terminal. Use with extreme caution!',
            extendedHelp: 'The exec command (better known as execute) will run any form of string provided in the direct console, which will affect the bot. Beware - do not shove random text or commands you\'re unaware of up this commands ass!',
            guarded: true,
            permissionLevel: 10,
            usage: '<expression:string>'
        });
    }
    async run(msg, [input]) {
        const result = await exec(input, { timeout: 'timeout' in msg.flags ? Number(msg.flags.timeout) : 60000 })
            .catch(error => ({ stdout: null, stderr: error }));
        const output = result.stdout ? `**\`OUTPUT\`**${codeBlock('prolog', result.stdout)}` : '';
        const outerr = result.stderr ? `**\`ERROR\`**${codeBlock('prolog', result.stderr)}` : '';

        return msg.sendMessage([output, outerr].join('\n'));
    }
};