const { Task } = require('klasa');
const fetch = require('node-fetch');
const { config: { api_keys: { spotify_client_id, spotify_client_secret } } } = require(`${process.cwd()}/config`);

const authorization = Buffer.from(`${spotify_client_id}:${spotify_client_secret}`).toString('base64');
const options = {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
        Authorization: `Basic ${authorization}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

module.exports = class extends Task {
    async run() {
        this._getToken();
    }
    async init() {
        this._getToken();
    }
    async _getToken() {
        try {
            this.client._spotifyToken = await fetch(`https://accounts.spotify.com/api/token`, options)
                .then(response => response.json())
                .then(response => response.access_token);
        } catch (error) {
            this.client.emit('wtf', error);
        }
    }
};