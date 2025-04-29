const pool = require('../config/db');

// Vérifie si un utilisateur existe par email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; // rows est un tableau d'objets
};

// Crée un nouvel utilisateur
const createUser = async ({ firstname, lastname, email, password, role, adress, phone }) => {
  const [result] = await pool.query(
    'INSERT INTO users (firstname, lastname, email, password, role, adress, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, email, password, role, adress, phone]
  );
  return result.insertId;
};

// Trouve un utilisateur par ID
const findUserById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Supprime un utilisateur
const deleteUserById = async (id) => {
  await pool.query('DELETE FROM users WHERE id = ?', [id]);
};

// Liste tous les restaurants
const findAllRestaurants = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'restaurant'");
  return rows;
};

// Trouve un restaurant par ID
const findRestaurantById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ? AND role = 'restaurant'", [id]);
  return rows[0];
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  deleteUserById,
  findAllRestaurants,
  findRestaurantById,
};
