const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, 'myHardCodedSecret123', { expiresIn: '30d' });
};

module.exports = generateToken;
