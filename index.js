const {
    Client
} = require('klasa');
const {
    config,
    token
} = require('./config');
const ModLog = require("./util/modlog");

// "488337189831442432" morphobot lounge
// "488337556224737290" staff role
const mbAdmin = [];
// stitch, morph
const mbOwner = ['257847417183928320', '234558143051464704'];

// Morphobot's custom permission level system and configuration.
Client.defaultPermissionLevels
    .add(5, (client, message) => message.member && message.member.roles.some(role => role.name === 'Moderator'), {
        fetch: true
    })
    .add(6, (client, message) => message.member && message.member.permissions.has('MANAGE_GUILD'), {
        fetch: true
    })
    .add(7, (client, message) => message.guild && message.guild.ownerID === message.author.id, {
        fetch: true
    })
    .add(8, (client, message) => message.guild && message.guild.id === '488337189831442432' && message.member.roles.has('488337556224737290'), {
        fetch: true
    })
    .add(9, (client, message) => mbAdmin.includes(message.author.id), {
        fetch: true
    })
    .add(10, (client, message) => mbOwner.includes(message.author.id), {
        break: true
    });

Client.defaultGuildSchema
    .add("modlogs", "TextChannel");

class Morphobot extends Client {
    constructor(...args) {
        super(...args);
        this.moderation = new ModLog(this)
    }
}

new Morphobot(config).login(token);