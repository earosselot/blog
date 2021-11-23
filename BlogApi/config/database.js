import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const { DBURI, SESSION_SECRET } = process.env;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedtopology: true,
};
const connection = mongoose.createConnection(DBURI, dbOptions);

export default connection;
