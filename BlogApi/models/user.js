import mongoose from 'mongoose';
import connection from '../config/database.js';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, minLength: 3 },
  hash: String,
  salt: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

export default connection.model('User', UserSchema);
