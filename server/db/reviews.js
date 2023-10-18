const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;


const createReview = async (review) => {
  const SQL = `
      INSERT INTO reviews (id, product_id, author, text, rating) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
  const response = await client.query(SQL, [uuidv4(), review.product_id, review.author, review.text, review.rating]);
  return response.rows[0];
};

const fetchReviews = async () => {
  const SQL = `
      SELECT *
      FROM reviews
      ORDER BY product_id
    `;
  const response = await client.query(SQL);
  return response.rows;
};
const deleteReview = async(review)=> {

  const SQL = `
    DELETE from reviews
    WHERE id = $1
  `;
  await client.query(SQL, [review.id]);
};

module.exports = {
  createReview,
  fetchReviews,
  deleteReview
};