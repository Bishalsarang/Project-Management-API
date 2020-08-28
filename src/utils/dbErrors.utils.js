const httpStatusCodes = require('http-status-codes');
const { wrapError, DBError, UniqueViolationError, NotNullViolationError } = require('db-errors');

const getDatabaseErrorMessage = (err) => {
  err = wrapError(err);

  let message = '';

  if (err instanceof UniqueViolationError) {
    message = `Unique constraint ${err.constraint} failed for table ${err.table} and columns ${err.columns}`;
  } else if (err instanceof NotNullViolationError) {
    message = `Not null constraint failed for table ${err.table} and column ${err.column}`;
  } else if (err instanceof DBError) {
    message = `Some unknown DB error ${DBError.nativeError}`;
  }
  const error = new Error(message);

  error.status = httpStatusCodes.INTERNAL_SERVER_ERROR;

  return error;
};

module.exports = getDatabaseErrorMessage;
