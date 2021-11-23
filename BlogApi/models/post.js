import mongoose from 'mongoose';
import connection from '../config/database.js';

// const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  published: { type: Boolean },
  createdAt: { type: Date, default: new Date() },
});

// module.exports = mongoose.model('Post', PostSchema);
export default connection.model('Post', PostSchema);
