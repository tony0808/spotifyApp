const { userResponse } = require('./utils/postRequests/auth');
const { countTracks, getTrackGenres } = require('./utils/getRequests/tracks');

const get_track_id_form = async (req, res) => {
    res.render('app/dynamic/track_id_form');
};

const track_genres = async (req, res) => {
    try {
        const genres = await getTrackGenres(req.session.access_token, req.params.id);
        res.status(200).json({ genres });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error counting all tracks" });
    }
};

const tracks_count = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const count = await countTracks(userid, req.session.access_token);
        res.status(200).json({ count });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error counting all tracks" });
    }
};

module.exports = {
    get_track_id_form,
    tracks_count,
    track_genres
};