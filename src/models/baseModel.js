const db = require('../db');

/**
 *  This is our extended model which add common CRUD operations in every  model.
 */
const model = db.Model.extend(
  {},
  {
    /**
     * Returns all the rows based on the filter.
     *
     * @param {Object} filter
     * @param {Object} options
     */
    findAll: function (filter = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .fetchAll({ ...options, debug: process.env.DEBUG_BOOK_SHELF })
          .then((rows) => resolve(rows.toJSON()))
          .catch((err) => reject(err));
      });
    },

    /**
     * Returns a row matching the filter.
     *
     * @param {Object} filter
     * @param {Object} options
     */
    findOne: function (filter = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .fetch({ ...options, debug: process.env.DEBUG_BOOK_SHELF })
          .then((row) => resolve(row.toJSON()))
          .catch((err) => reject(err));
      });
    },

    /**
     * Insert row.
     *
     * @param {Object} data
     * @param {Object} options
     */
    create: function (data, options) {
      return new Promise((resolve, reject) => {
        this.forge(data)
          .save(null, { ...options, method: 'insert', debug: process.env.DEBUG_BOOK_SHELF })
          .then((rows) => resolve(rows.toJSON()))
          .catch((err) => reject(err));
      });
    },

    /**
     * Update.
     *
     * @param {Object} filter
     * @param {Object} data
     * @param {Object} options
     */
    update: function (filter = {}, data = {}, options) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .save(data, { ...options, method: 'update', patch: 'true', debug: process.env.DEBUG_BOOK_SHELF })
          .then((rows) => resolve(rows.toJSON()))
          .catch((err) => reject(err));
      });
    },

    destroy: function (filter = {}, options) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .destroy(options)
          .then((rows) => resolve(rows.toJSON()))
          .catch((err) => reject(err));
      });
    },

    getRelated: function (relatedTableName, filter = {}, options = {}) {
      return new Promise((resolve, reject) => {
        this.where(filter)
          .fetch({ ...options, withRelated: [relatedTableName], debug: process.env.DEBUG_BOOK_SHELF })
          .then((result) => resolve(result.related(relatedTableName).toJSON()))
          .catch((err) => reject(err));
      });
    }
  }
);

module.exports = model;
