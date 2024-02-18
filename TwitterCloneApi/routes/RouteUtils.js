import DataAccessError from "../repositories/DataAccessError.js";
import BadRequestError from "./BadRequestError.js";

function isUndefinedOrEmpty(value) {
  return value === undefined || value.length === 0;
}

function withErrorHandling(func) {
  return (...params) => {
    const res = params[1];
    try {
      return func(...params);
    } catch (error) {
      if (error.name === DataAccessError.Name) {
        return res.status(400).send(error.message);
      }
      if (error.name === BadRequestError.Name) {
        return res.status(400).send(error.message);
      }
      return res.status(500).send(`Internal server error: ${error.message}`);
    }
  };
}

function validateRequiredField(value, message) {
  if (isUndefinedOrEmpty(value)) {
    throw new BadRequestError(message);
  }
  return value;
}
export { isUndefinedOrEmpty, withErrorHandling, validateRequiredField };
