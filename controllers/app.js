const { userResponse } = require('./utils/postRequests');
const { getPlaylists, countTracks } = require('./utils/getRequests');

const get_homepage = async (req, res) => {
    if (!req.session.access_token) {
        res.status(500).json({ err_msg: "Access token is not available for some reason." });
        return;
    }
    const user = (await userResponse(req.session.access_token)).display_name;
    res.render('app/home', { title: 'Homepage', user });
};

const count_tracks = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const tracks = await countTracks(userid, req.session.access_token);
        console.log(tracks);
        res.status(200).json({ tracks });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error counting all playlists" });
    }
};

const get_all_playlists = async (req, res) => {
    try {
        const userid = (await userResponse(req.session.access_token)).id;
        const playlists = await getPlaylists(userid, req.session.access_token);
        res.render('app/playlists/all', { playlists: playlists, title: 'All Playlists' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "error retrieving all playlists" });
    }
}

const logout = async (req, res) => {
    try {
        await req.session.destroy();
        res.clearCookie('connect.sid');
        res.redirect('http://localhost:3000/');
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ err_msg: "unexpected error during logout" });
    }
};

module.exports = {
    get_homepage,
    logout,
    get_all_playlists,
    count_tracks
};