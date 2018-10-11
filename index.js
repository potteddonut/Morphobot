const {
    Client,
    PermissionLevels
} = require('klasa');
const {
    config,
    token
} = require('./config');
// "488337189831442432" // morphobot lounge
// "488337556224737290" staff role
const mbAdmin = [];
const mbOwner = ["257847417183928320", "234558143051464704"]; // stitch, morph

Client.defaultPermissionLevels
    .add(5, (client, message) => message.author.roles.some(r => r.name === "Moderator"), {
        fetch: true
    })
    .add(6, (client, message) => message.member && message.member.permissions.has("MANAGE_GUILD"), {
        fetch: true
    })
    .add(7, (client, message) => message.guild.ownerID === message.author.id), {
        fetch: true
    }
    .add(8, (client, message) => message.guild && message.guild.id === "488337189831442432" && message.member.roles.has("488337556224737290"), {
        fetch: true
    })
    .add(9, (client, message) => message.member && mbAdmin.includes(message.author.id), {
        fetch: true
    })
    .add(10, (client, message) => message.member && mbOwner.includes(message.author.id), {
        break: true
    });

class MyKlasaClient extends Client {

    constructor(...args) {
        super(...args);

        // Add any properties to your Klasa Client
    }

    // Add any methods to your Klasa Client

}

new MyKlasaClient(config).login(token);