const appController = require('../controllers/app');
const express = require('express');
const router = express.Router();

router.get('/home', appController.get_homepage);
router.get('/logout', appController.logout);
router.get('/playlists/all', appController.get_all_playlists);

module.exports = router;
