// savePaymentToDatabase.js
const pool = require('./db');

const savePaymentToDatabase = async (paymentIntent) => {
  const { id: payment_id, amount, currency, payment_method, created } = paymentIntent;

  try {
    const query = `
      INSERT INTO payments (payment_id, amount, currency, payment_method, created_at)
      VALUES ($1, $2, $3, $4, to_timestamp($5))
      RETURNING *;
    `;

    const values = [payment_id, amount, currency, payment_method, created];
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the inserted row
  } catch (err) {
    console.error('Error saving payment to database', err);
    throw err;
  }
};

module.exports = savePaymentToDatabase;
