import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from 'cookie-parser';
// bcript
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes/index.js';

/**
 * -------------- GENERAL SETUP ----------------
 */

dotenv.config();
const { DBURI, PORT, SESSION_SECRET } = process.env;

const app = express();

// protection against vulnerabilities
app.use(helmet());

// Compress all routes
app.use(compression());

// Logger
app.use(morgan('tiny'));

// Allow express server to parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000', // <-- location of the react app were connecting to
    credentials: true,
  })
);

/**
 * ----------------- SESSIONS ------------------
 */
const sessionStore = MongoStore.create({
  mongoUrl: DBURI,
  collection: 'sessions',
});

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in ms
    },
  })
);

app.use(cookieParser(SESSION_SECRET));

/**
 * ---------- PASSPORT AUTHENTICATION ----------
 */
app.use(passport.initialize());
app.use(passport.session());
import strategy from './config/passport.js';
// this set the local-strategy and serialize and deserialize user.
strategy(passport);

/**
 * ------------------ ROUTES -------------------
 */
app.use('/api/user', routes.user);
app.use('/api/post', routes.post);
app.use('/api/post', routes.comment);

/**
 * ------------------ ERRORS -------------------
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // respond error
  res.status(err.status || 500);
  res.send();
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
