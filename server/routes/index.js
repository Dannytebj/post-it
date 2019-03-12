const express = require('express');
const { create, getUserToken } = require('../controllers/usersController');
const { validateUser } = require('../middlewares/validators');

const router = express.Router();

router.post('/user/create',validateUser, create);
router.post('/user/getToken', getUserToken);

module.exports = router;
