// menentukan rute-rute yang akan dihandle oleh controller
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const rekomendasiRouter = require('./rekomendasi');

router.get('/', userController.signIn);
router.get('/sign-up', userController.signUp);
router.use('/users', require('./users'));
router.use('/habit', require('./habit'));
router.get('/sign-out', userController.destroySession);
router.use('/rekomendasi', rekomendasiRouter);

module.exports = router;
