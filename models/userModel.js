const pool = require('../config/db');
const db = require('../config/db');

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

// Liste tous les livreurs
const findAllLivreurs = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE role = 'livreur'");
  return rows;
};

const findByUserId = async(userId, role) => {
  let orders;
  if (role === 'client') {
    [orders] = await db.execute(
      'SELECT * FROM orders WHERE client_id = ?',
      [userId]
    );
  } else if (role === 'livreur') {
    [orders] = await db.execute(
      `SELECT * FROM orders
       WHERE delivery_person_id = ? OR delivery_person_id IS NULL`,
      [userId]
    );
  } else {
    return [];
  }

  for (const order of orders) {
    const [items] = await db.execute(
      'SELECT menu_item_id, quantity, item_status FROM order_items WHERE order_id = ?',
      [order.id]
    );
    order.items = items;
  }

  return orders;
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  deleteUserById,
  findAllRestaurants,
  findRestaurantById,
  findAllLivreurs,
  findByUserId
};
