const { REDIRECT_URI, CODE_CHALLENGE } = require('./utils/appConstants');
const pr = require('./utils/postRequests');

const get_about_page = (req, res) => {
    if (req.session) {
        console.log(req.session);
    }
    res.render('index/about', { title: 'About Page' });
};

const login = (req, res) => {
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user-read-private playlist-read-private&code_challenge_method=S256&code_challenge=${CODE_CHALLENGE}`);
}

const callback = async (req, res) => {
    const { code, error } = req.query;
    if (error) {
        return res.status(400).send(`Error: ${error}`);
    }
    const access_token = (await pr.tokenResponse(code)).access_token;
    req.session.access_token = access_token;
    res.redirect('http://localhost:3000/app/home');
};

module.exports = {
    get_about_page,
    login,
    callback
};