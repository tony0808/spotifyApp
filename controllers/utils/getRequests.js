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
    const playlistsIds = await getPlaylistsIds(userid, access_token);
    let no_tracks = 0;
    for (let i = 0; i < playlistsIds.length; i++) {
        const options = {
            url: `https://api.spotify.com/v1/playlists/${playlistsIds[i]}/tracks`,
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            json: true
        };
        const response = await rp.get(options);
        console.log(no_tracks);
        no_tracks += response.total;
    }
    return no_tracks;
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