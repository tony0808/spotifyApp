const rp = require('request-promise-native');

const playlistResponse = async (userid, access_token) => {

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
    return playlists;
};

module.exports = {
    playlistResponse
};