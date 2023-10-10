const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;

const fetchTags = async()=> {
  const SQL = `
    SELECT *
    FROM tags
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createTag = async(tag)=> {
  const SQL = `
    INSERT INTO tags (id, name) VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), tag.name]);
  return response.rows[0];
};

const fetchProductTagPairs = async()=> {
  const SQL = `
    SELECT *
    FROM product_tag_pairs
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const createProductTagPair = async(pt)=> {
  const SQL = `
    INSERT INTO product_tag_pairs (id, product_id, tag_id) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [ uuidv4(), pt.product_id, pt.tag_id]);
  return response.rows[0];
};

module.exports = {
  fetchTags,
  createTag,
  // fetchProductTagPairs,
  // createProductTagPair
};
