const rp = require('request-promise-native');

const getArtist = async (access_token, artist_id) => {
    const options = {
        url: `https://api.spotify.com/v1/artists/${artist_id}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    const artist = await rp.get(options);
    return artist;
};

const getTrackGenres = async (access_token, track_id) => {
    const options = {
        url: `https://api.spotify.com/v1/tracks/${track_id}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    const track = await rp.get(options);
    let genres = new Set();
    for (const artist of track.artists) {
        const artistData = await getArtist(access_token, artist.id);
        artistData.genres.forEach((genre) => { genres.add(genre); });
    }
    return Array.from(genres);
};

const countTracks = async (userid, access_token) => {
    let totalTracks = 0;
    let limit = 50;
    let offset = 0;
    while (true) {
        const options = {
            url: `https://api.spotify.com/v1/users/${userid}/playlists?limit=${limit}&offset=${offset}`,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        const response = await rp.get(options);
        const items = response.items;
        for (let i = 0; i < response.items.length; i++) {
            const item = items[i];
            const tracks = item.tracks;
            totalTracks += tracks.total;
        }
        offset += limit;
        if (offset > response.total) {
            break;
        }
    }
    return totalTracks;
};

module.exports = {
    countTracks,
    getTrackGenres
};