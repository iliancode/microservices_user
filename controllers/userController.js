const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const e = require('express');

const register = async (req, res) => {
  const { firstname, lastname, email, password, role, adress, phone } = req.body;
  try {
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const insertId = await userModel.createUser({
      firstname, lastname, email, password: hashedPassword, role, adress, phone
    });

    const user = await userModel.findUserById(insertId);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await userModel.findUserById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listRestaurants = async (req, res) => {
  try {
    const restaurants = await userModel.findAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listLivreurs = async (req, res) => {
    try {
      const restaurants = await userModel.findAllLivreurs();
      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getRestaurantById = async (req, res) => {
  try {
    const user = await userModel.findRestaurantById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const getUserOrders = async(req, res) => {
  const user = req.user;
  console.log('User ID:', user);
  try {
    const orders = await userModel.findByUserId(user.id, user.role);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  deleteUser,
  listRestaurants,
  getRestaurantById,
  listLivreurs,
  getUserOrders
};
