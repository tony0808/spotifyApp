const rp = require('request-promise-native');

const distribute_tracks_by_genre = async (userid, access_token) => {
    const options = { url: `https://api.spotify.com/v1/users/${userid}/playlists`, headers: { 'Authorization': 'Bearer ' + access_token }, json: true };
    const playlists_info = await rp.get(options);
    const playlists = playlists_info.items;
    const distribution = {};
    const promises = [];
    for (let i = 0; i < playlists.length; i++) {
        const playlist_id = playlists[i].id;
        promises.push(get_playlist_genres(playlist_id, access_token));
    }
    const responses = await Promise.all(promises);
    responses.forEach(resp => {
        for (let key in resp) {
            if (key in distribution) {
                distribution[key] += resp[key];
            }
            else {
                distribution[key] = resp[key];
            }
        }
    });
    return distribution;
};

const get_playlist_genres = async (playlist_id, access_token) => {
    const distribution = {};
    let options = { url: `https://api.spotify.com/v1/playlists/${playlist_id}`, headers: { 'Authorization': 'Bearer ' + access_token }, json: true };
    const playlist_info = await rp.get(options);
    const total_tracks = playlist_info.tracks.total;
    const tracks = playlist_info.tracks.items;

    // Create an array of promises for fetching track genres
    const trackPromises = tracks.map(track => get_track_genres(track.track.id, access_token));

    // Use Promise.all() to fetch all track genres in parallel
    const trackGenres = await Promise.all(trackPromises);

    // Iterate through the track genres and count the distributions
    trackGenres.forEach(track_genres => {
        track_genres.forEach(genre => {
            if (genre in distribution) {
                distribution[genre] += 1;
            }
            else {
                distribution[genre] = 1;
            }
        });
    });

    return distribution;
};

const get_track_genres = async (track_id, access_token) => {
    let options = { url: `https://api.spotify.com/v1/tracks/${track_id}`, headers: { 'Authorization': 'Bearer ' + access_token }, json: true };
    const track_info = await rp.get(options);
    const artist = track_info.artists[0];
    options = { url: artist.href, headers: { 'Authorization': 'Bearer ' + access_token }, json: true };
    const artist_info = await rp.get(options);
    const genres = artist_info.genres;
    return genres;
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
    countTracks,
    get_track_genres,
    distribute_tracks_by_genre
};