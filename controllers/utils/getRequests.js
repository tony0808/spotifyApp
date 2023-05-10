const rp = require('request-promise-native');

const getPlaylistsIds = async (userid, access_token) => {
    const playlists = [];
    let offset = 0;
    let limit = 50;

    while (true) {
        const options = {
            url: `https://api.spotify.com/v1/users/${userid}/playlists?limit=${limit}&offset=${offset}`,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        const response = await rp.get(options);
        if (response.items.length === 0) {
            break;
        }
        playlists.push(...response.items.map(playlist => playlist.id));
        offset += limit;
    }
    return playlists;
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

const countPlaylists = async (userid, access_token) => {
    const options = {
        url: `https://api.spotify.com/v1/users/${userid}/playlists`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    const response = await rp.get(options);
    return response.total;
};

const getPlaylists = async (userid, access_token) => {

    const playlists = [];
    let offset = 0;
    let limit = 50;

    while (true) {
        const options = {
            url: `https://api.spotify.com/v1/users/${userid}/playlists?limit=${limit}&offset=${offset}`,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        const response = await rp.get(options);
        if (response.items.length === 0) {
            break;
        }
        playlists.push(...response.items);
        offset += limit;
    }
    return playlists.map(playlist => ({ name: playlist.name, id: playlist.id }));
};

module.exports = {
    getPlaylists,
    countPlaylists,
    countTracks
};