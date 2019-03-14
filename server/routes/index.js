const express = require('express');
const { createUser, getUserToken } = require('../controllers/usersController');
const { createGroup, groups, groupUsers } = require('../controllers/groupController');
const { validateUser, validateToken, groupValidator } = require('../middlewares/validators');

const router = express.Router();

router.post('/user/create',validateUser, createUser);
router.post('/user/getToken', getUserToken);
router.get('/user/groups', validateToken, groups);

router.post('/group/create', validateToken, groupValidator, createGroup);
router.get('/group/users/:id', validateToken, groupUsers);

module.exports = router;
