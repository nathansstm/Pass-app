// getAllPayments.js
const pool = require('./db');

const getAllPayments = async () => {
  try {
    const query = `SELECT * FROM payments ORDER BY created_at DESC;`;
    const result = await pool.query(query);
    return result.rows; // Return all rows (payments)
  } catch (err) {
    console.error('Error fetching all payments', err);
    throw err;
  }
};

module.exports = getAllPayments;


