const { userResponse } = require('./utils/postRequests/auth');
const { countPlaylists, getPlaylists, getPlaylistTracks, getPlaylistGenres } = require('./utils/getRequests/playlists');

const playlist_id_track_form = async (req, res) => {
    res.render('app/dynamic/playlist_id_track_form');
};

const playlist_id_genre_form = async (req, res) => {
    res.render('app/dynamic/playlist_id_genre_form');
};

const get_playlist_genres = async (req, res) => {
    try {
        const genres = await getPlaylistGenres(req.session.access_token, req.params.id);
        res.status(200).json({ genres });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error retrieving playlists genres" });
    }
};

const get_playlist_tracks = async (req, res) => {
    try {
        const tracks = await getPlaylistTracks(req.session.access_token, req.params.id);
        res.status(200).json({ tracks });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error retrieving playlists tracks" });
    }
};

const get_playlists_count = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const count = await countPlaylists(userid, req.session.access_token);
        res.status(200).json({ count });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error retrieving playlists count" });
    }
};

const get_playlists = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const playlists = await getPlaylists(userid, req.session.access_token);
        res.status(200).json({ playlists });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error retrieving all playlists" });
    }
};

module.exports = {
    playlist_id_track_form,
    playlist_id_genre_form,
    get_playlists_count,
    get_playlists,
    get_playlist_tracks,
    get_playlist_genres
};