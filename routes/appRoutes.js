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
router.get('/playlists/playlist_id_form', playlistController.get_playlist_id_form);
router.get('/playlists/:id/tracks', playlistController.get_playlist_tracks);

// track controller 
router.get('/tracks/count', trackController.tracks_count);
router.get('/tracks/genres/:id', trackController.track_genres);
router.get('/tracks/track_id_form', trackController.get_track_id_form);

// other
router.get('/logout', appController.logout);

module.exports = router;
