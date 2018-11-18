const { Command } = require('klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            description: 'Searches Spotify for an artist, and returns information.',
            usage: '<query:str{1,100}>'
        });
    }
    async run(msg, [query]) {
        if (!this.client._spotifyToken) return this.client.emit('error', 'Spotify Token is undefined');
        const artist = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=1`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.client._spotifyToken}`
                }
            })
            .then(response => response.json())
            .then(response => response.artists.items[0])
            .catch(() => { throw msg.responder.error('An unexpected error occured. Try again in a bit.'); });
        if (artist) return msg.sendMessage(artist.external_urls.spotify);
        throw "Couldn't find any artist with that name."
    }
};