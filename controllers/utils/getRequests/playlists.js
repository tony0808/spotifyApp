const rp = require('request-promise-native');

const getPlaylistTracks = async (access_token, playlistId) => {
    const options = {
        url: `https://api.spotify.com/v1/playlists/${playlistId}`,
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        json: true
    };
    const playlist = await rp.get(options);
    const playlistTracks = playlist.tracks.items.map(item => {
        return {
            created_at: item.added_at,
            id: item.track.id,
            name: item.track.name,
            duration_ms: item.track.duration_ms
        };
    });
    return playlistTracks;
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
    getPlaylistTracks
};