const { userResponse } = require('./utils/postRequests');
const { countPlaylists, getPlaylists } = require('./utils/getRequests');

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
    get_playlists_count,
    get_playlists
};