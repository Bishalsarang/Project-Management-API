/* eslint-disable no-unused-vars */
const User = require('../models/user');

const getUsers = async (filter) => {
  try {
    const users = await User.findAll(filter);

    //  Remove password field from response
    return users.map(({ password, ...rest }) => rest);
  } catch (err) {
    return err;
  }
};

const updateUsers = async (filter, updateData) => {
  try {
    const { password, ...rest } = await User.update(filter, updateData);

    return rest;
  } catch (err) {
    return err;
  }
};

const deleteUsers = async (userId) => {
  try {
    //   Here softdelete is a method specific to User rather than baseModel so we need to create an instance using forge
    const { password, ...rest } = await User.forge().softDelete(userId);

    return rest;
  } catch (err) {
    return err;
  }
};

module.exports = { getUsers, updateUsers, deleteUsers };
