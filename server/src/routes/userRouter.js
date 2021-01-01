const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const { auth } = require('../middleware');

router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.get('/rftoken', userCtrl.rfToken);
router.get('/logout', userCtrl.logout);
router.get('/info', auth, userCtrl.getUser);

module.exports = router;
