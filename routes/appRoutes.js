const appController = require('../controllers/app');
const playlistController = require('../controllers/playlists');
const trackController = require('../controllers/tracks');
const express = require('express');
const router = express.Router();

// view controller
router.get('/home', appController.get_homepage);
router.get('/playlists/manage', appController.get_playlists_index_page);
router.get('/tracks/manage', appController.get_tracks_index_page);

// playlist controller
router.get('/playlists/count', playlistController.get_playlists_count);
router.get('/playlists/list', playlistController.get_playlists);

// track controller 
router.get('/tracks/count', trackController.count_tracks);

// other
router.get('/logout', appController.logout);

module.exports = router;
