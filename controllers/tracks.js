const { userResponse } = require('./utils/postRequests');
const { countTracks, distribute_tracks_by_genre } = require('./utils/getRequests');

const get_distributed_tracks_by_genre = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const response = await distribute_tracks_by_genre(userid, req.session.access_token);
        res.status(200).json({ response });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error distributing tracks" });
    }
};

const count_tracks = async (req, res) => {
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
    count_tracks,
    get_distributed_tracks_by_genre
};