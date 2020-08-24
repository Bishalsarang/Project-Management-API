const db = require('../db');

/**
 *  This is our extended model which add CRUD operations in our model.
 */
const model = db.Model.extend(
  {},
  {
    /**
     * Returns all the rows based on the condition.
     *
     * @param {Object} filter
     * @param {*} options
     */
    findAll: function (filter = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .fetchAll(options)
          .then((rows) => {
            resolve(rows.toJSON());
          })
          .catch((err) => reject(err));
      });
    },

    findOne: function (filter = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .fetch(options)
          .then((row) => {
            resolve(row.toJSON());
          })
          .catch((err) => reject(err));
      });
    },

    create: function (data, options) {
      return new Promise((resolve, reject) => {
        this.forge(data)
          .save(null, options)
          .then((rows) => {
            resolve(rows.toJSON());
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    }

    //  update: function (filter, data, options) {},

    //  destroy: function (filter, options) {}
  }
);

module.exports = model;
