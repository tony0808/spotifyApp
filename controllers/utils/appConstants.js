const crypto = require('crypto');
const REDIRECT_URI = 'http://localhost:3000/callback';
const CODE_VERIFIER = crypto.randomBytes(32).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
const CODE_CHALLENGE = crypto.createHash('sha256').update(CODE_VERIFIER).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

module.exports = {
    REDIRECT_URI,
    CODE_VERIFIER,
    CODE_CHALLENGE
};