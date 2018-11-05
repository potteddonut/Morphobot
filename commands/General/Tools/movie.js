const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const tmdbAPIkey = '225e25ff3705df9811a4bc3b8198cddc';

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['movie', 'film'],
            description: 'Finds a movie on TMDB.org',
            usage: '<Query:str> [Page:number]',
            usageDelim: ', '
        });
    }
    async run(msg, [query, page = 1]) {
        const url = new URL('https://api.themoviedb.org/3/search/movie');
        url.search = new URLSearchParams([
            ['api-key', tmdbAPIkey],
            ['query', query]
        ]);

        const body = await fetch(url)
            .then((res) => {
                if (res.status === 404) return Promise.reject("I couldn't find a movie with that title");
                if (res.status !== 200) return Promise.reject(`An error occured. Status: ${res.status}`);
                return res.json();
            })
            .catch(() => {
                throw `I couldn't find a movie with the title **${query}** in page ${page}.`;
            });

        const movie = body.results[page - 1];
        if (!movie) throw `I couldn't find a movie with the title **${query}** in page ${page}.`;

        const embed = new MessageEmbed()
            .setImage(`https://image.tmdb.org/t/p/original${movie.poster_path}`)
            .setTitle(`${movie.title} (${page} out of ${body.results.length} results)`)
            .setDescription(movie.overview)
            .setFooter(`${this.client.user.username} uses the TMDb API but is not endorsed or certified by TMDb.`,
                `https://themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png`);

        if (movie.title !== movie.original_title) embed.addField('Original Title', movie.original_title, true);
        embed
            .addField('Vote Count', movie.vote_count, true)
            .addField('Vote Average', movie.vote_average, true)
            .addField('Popularity', movie.popularity, true)
            .addField('Adult Content', movie.adult ? 'Yes' : 'No', true)
            .addField('Release Date', movie.release_date);

        return msg.sendEmbed(embed);
    }
}