import passport from 'passport';
import { body, validationResult } from 'express-validator';

import User from '../models/user.js';
import { validPassword, genPassword } from '../utils/passwordUtils.js';
import { throwNotValidFields, throwUserNotFound } from '../utils/errors.js';

async function userGet(req, res, next) {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-hash -salt');
    if (!user) {
      throwUserNotFound();
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

async function myInfoGet(req, res, next) {
  try {
    if (req.user) {
      res.json(req.user);
    }
    res.send();
  } catch (e) {
    next(e);
  }
}

// TODO: este endpoint parece medio inutil e inseguro...
async function usersGet(req, res, next) {
  try {
    const users = await User.find({}).select('username');
    res.json(users);
  } catch (error) {
    next(error);
  }
}

function userLogout(req, res, next) {
  req.logout();
  res.json({ message: 'logout' });
}

const userPost = [
  body('uname').trim().isLength({ min: 3 }).escape(),
  body('pw').trim().isLength({ min: 8 }),
  body('firstName').trim().isLength({ min: 3 }).escape(),
  body('lastName').trim().isLength({ min: 3 }).escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throwNotValidFields(errors);
      }

      const user = await User.findOne({ username: req.body.uname });
      if (user === null) {
        const newUser = createNewUser(req.body);
        await newUser.save();
        res.json({ message: 'user created' });
      }
    } catch (error) {
      next(error);
    }
  },
];

function createNewUser(reqBody) {
  const { salt, hash } = genPassword(reqBody.pw);
  const newUser = new User({
    username: reqBody.uname,
    lastName: reqBody.lastName,
    firstName: reqBody.firstName,
    hash,
    salt,
  });
  return newUser;
}

const userLogin = [
  passport.authenticate('local'),
  (req, res, next) => {
    // if authenticate succed it continues to this function and save the user in req.user
    // otherwise returns 401 Unauthorized
    const userInfo = {
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      admin: req.user.admin,
    };
    res.json({ message: 'login success', user: userInfo });
  },
];

const userPut = [
  body('uname').trim().isLength({ min: 3 }).escape(),
  body('firstName').trim().isLength({ min: 3 }).escape(),
  body('lastName').trim().isLength({ min: 3 }).escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throwNotValidFields(errors);
      }

      const userId = req.user._id.toString();
      const user = await User.findById(userId);
      if (user === null) {
        throwUserNotFound();
      }

      const updatedUser = new User({
        username: req.body.uname,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        _id: user._id,
        hash: user.hash,
        salt: user.salt,
      });

      await User.findByIdAndUpdate(userId, updatedUser, {});

      const updatedUser2 = await User.findById(userId).select('-hash -salt');

      res.json({ message: 'User successfully updated', user: updatedUser2 });
    } catch (error) {
      next(error);
    }
  },
];

const userPasswordPut = [
  body('pw').trim().isLength({ min: 8 }),
  body('newPw').trim().isLength({ min: 8 }),
  body('newPw2').trim().isLength({ min: 8 }),

  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty() || req.body.newPw !== req.body.newPw2) {
        throwNotValidFields(errors);
      }
      const userId = req.user._id.toString();
      const user = await User.findById(userId);

      const { salt, hash } = genPassword(req.body.newPw);
      const updatedUser = new User({
        username: user.uname,
        lastName: user.lastName,
        firstName: user.firstName,
        _id: user._id,
        hash,
        salt,
      });

      await User.findByIdAndUpdate(userId, updatedUser, {});
      res.json({ message: 'password updated successfully' });
    } catch (error) {
      next(error);
    }
  },
];

async function userDelete(req, res, next) {
  try {
    const userId = req.user._id.toString();
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      throwUserNotFound();
    }
    await User.findByIdAndDelete(userId);
    res.json({
      message: `User ${userToDelete.username} deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  userGet,
  myInfoGet,
  usersGet,
  userLogout,
  userPost,
  userLogin,
  userPut,
  userPasswordPut,
  userDelete,
};
