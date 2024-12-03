const objectId = (value, helpers) => {
  if (!value.match(/^[A-Za-z0-9]{20,28}$/)) {
    return helpers.message('"{{#label}}" must be a valid id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

module.exports = {
  password,
  objectId,
};
