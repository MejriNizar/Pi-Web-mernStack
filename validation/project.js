const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.startDate = !isEmpty(data.startDate) ? data.startDate : '';
  data.endDate = !isEmpty(data.endDate) ? data.endDate : '';


  if (!Validator.isLength(data.name, { min: 6})) {
    errors.name = 'Name must be min 6 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }
  if (Validator.isAlpha(data.name)) {
    errors.name = 'Name is Bad';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (!Validator.isLength(data.description, { min: 20})) {
    errors.description = 'Name must be min 20 characters';
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = 'Start date field is required';
  }
  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = 'End date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
