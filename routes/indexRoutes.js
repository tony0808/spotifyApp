const indexController = require('../controllers/index');
const express = require('express')
const router = express.Router();

router.get('/', indexController.get_about_page);
router.get('/contact', indexController.get_contact_page);
router.get('/login', indexController.login);
router.get('/callback', indexController.callback);

module.exports = router;
