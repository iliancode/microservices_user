const express = require('express');
const { register, login, getMe, deleteUser, listRestaurants } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

router.delete('/:id', protect, authorize('admin'), deleteUser);
router.get('/all', listRestaurants);

module.exports = router;
