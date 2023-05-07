const { REDIRECT_URI, CODE_VERIFIER, CODE_CHALLENGE } = require('./appConstants');
const rp = require('request-promise-native');

const tokenResponse = async (code) => {
    return rp.post({
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: REDIRECT_URI,
            code_verifier: CODE_VERIFIER,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        },
        json: true,
    });
};

const userResponse = async (access_token) => {
    return rp.get({
        url: 'https://api.spotify.com/v1/me',
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
        json: true,
    });
}

module.exports = {
    tokenResponse,
    userResponse,
};