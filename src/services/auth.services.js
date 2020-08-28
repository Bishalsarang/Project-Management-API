const User = require('../models/user');

const getHashedPassword = async (username) => {
  try {
    const password = await User.findOne({ username });

    return password;
  } catch (err) {
    return err;
  }
};

module.exports = { getHashedPassword };
