const { userResponse } = require('./utils/postRequests');
const { countTracks } = require('./utils/getRequests');

const count_tracks = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const count = await countTracks(userid, req.session.access_token);
        res.status(200).json({ count });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error counting all playlists" });
    }
};

module.exports = {
    count_tracks
};