// getPaymentDetails.js
const pool = require('./db');

const getPaymentDetails = async (paymentId) => {
  try {
    const query = `SELECT * FROM payments WHERE id = $1;`;
    const values = [paymentId];
    const result = await pool.query(query, values);
    return result.rows[0]; // Return the fetched payment row
  } catch (err) {
    console.error('Error fetching payment details', err);
    throw err;
  }
};

module.exports = getPaymentDetails;


