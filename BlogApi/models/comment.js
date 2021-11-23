import mongoose from 'mongoose';
import connection from '../config/database.js';

// const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true, minLenght: 3 },
  author: { type: String, required: true, minLenght: 3 },
  timestamp: { type: Date, default: Date.now() },
});

// module.exports = mongoose.model('Comment', CommentSchema);
export default connection.model('Comment', CommentSchema);
