// auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = '1234';

function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function comparePassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
