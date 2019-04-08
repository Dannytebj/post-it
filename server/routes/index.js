const express = require('express');
const { createUser, getUserToken } = require('../controllers/usersController');
const { createGroup, groups, groupUsers, group } = require('../controllers/groupController');
const { createMessage, getMessages } = require('../controllers/messageController');
const { validateUser, validateToken, groupValidator, messageValidator } = require('../middlewares/validators');

const router = express.Router();

router.post('/user/create',validateUser, createUser);
router.post('/user/getToken', getUserToken);
router.get('/user/groups', validateToken, groups);

router.post('/group/create', validateToken, groupValidator, createGroup);
router.get('/group/users/:id', validateToken, groupUsers);
router.get('/group/:id', validateToken, group);

router.post('/message', validateToken, messageValidator, createMessage);
router.get('/messages/:groupId', validateToken, getMessages);

module.exports = router;
