const client = require('./client');
const { v4 } = require('uuid');
const uuidv4 = v4;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const findUserByToken = async (token) => {
  try {
    const payload = await jwt.verify(token, process.env.JWT);
    const SQL = `
      SELECT id, username, is_admin, is_vip
      FROM users
      WHERE id = $1
    `;
    const response = await client.query(SQL, [payload.id]);
    if (!response.rows.length) {
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }

    return response.rows[0];
  }
  catch (ex) {
    console.log(ex);
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

const authenticate = async (credentials) => {
  const SQL = `
    SELECT id, password
    FROM users
    WHERE username = $1
  `;
  const response = await client.query(SQL, [credentials.username]);
  if (!response.rows.length) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
  const valid = await bcrypt.compare(credentials.password, response.rows[0].password);
  if (!valid) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }

  return jwt.sign({ id: response.rows[0].id }, process.env.JWT);
};

const createUser = async (user) => {
  if (!user.username.trim() || !user.password.trim()) {
    throw Error('must have username and password');
  }
  user.password = await bcrypt.hash(user.password, 5);
  const SQL = `
    INSERT INTO users (id, username, password, is_admin, is_vip, avatar) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
  `;
  const response = await client.query(SQL, [uuidv4(), user.username, user.password, user.is_admin, user.is_vip, user.avatar || null]);
  return response.rows[0];
};

const fetchUsers = async()=> {
  const SQL = `
    SELECT *
    FROM users
    ORDER BY created_at
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const updateUser = async(user)=> {
  SQL = `
    UPDATE users
    SET is_vip = $1,
    avatar = $3
    WHERE id = $2
    RETURNING *
  `;
  const response = await client.query(SQL, [user.is_vip, user.id, user.avatar]);
  return response.rows[0];
};
module.exports = {
  createUser,
  fetchUsers,
  updateUser,
  authenticate,
  findUserByToken
};
