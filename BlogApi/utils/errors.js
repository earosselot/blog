function throwNotValidFields(errors) {
  const error = new Error('fields are not valid.');
  error.errors = errors.array();
  error.status = 400;
  throw error;
}

function throwUserNotFound() {
  const error = new Error('User not found');
  error.status = 400;
  throw error;
}

export { throwNotValidFields, throwUserNotFound };
