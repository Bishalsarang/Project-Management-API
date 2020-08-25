const { getCurrentUserRole } = require('../utils/auth.utils');

const getUsers = async (req, res, next) => {
  const role = await getCurrentUserRole(req);

  if (!role) {
    next('Error while getting users');
  }
  res.json(role);
};

module.exports = { getUsers };
