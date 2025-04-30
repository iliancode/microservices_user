const express = require('express');
const { register, login, getMe, deleteUser, listRestaurants , getRestaurantById, listLivreurs, getUserOrders, getAllMenus, getAllMenusByRestaurant } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/menu', getAllMenus);
router.get('/orders', protect, getUserOrders);
router.delete('/:id', protect, authorize('admin'), deleteUser);
router.get('/all', listRestaurants);
router.get('/allLivreurs', protect, listLivreurs);
// Route pour récupérer un restaurant par son ID
router.get('/:id', getRestaurantById);

router.get('/menu', getAllMenus);
router.get('/menu/:restaurant_id', getAllMenusByRestaurant);
router.get('/orders', protect, getUserOrders);

module.exports = router;
