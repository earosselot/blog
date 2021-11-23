import crypto from 'crypto';

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  var hashVeryfy = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVeryfy;
}

export { validPassword, genPassword };
