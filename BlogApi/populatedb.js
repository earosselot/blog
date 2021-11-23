#! /usr/bin/env node
import faker from 'faker';

import { validPassword, genPassword } from './utils/passwordUtils.js';

console.log(
  'This script populates some test users, posts and comments to your database. ' +
    'Specified database as argument - e.g.: populatedb ' +
    'mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
// var async = require('async');
// var Comment = require('./models/comment');
// var Post = require('./models/post');
// var User = require('./models/user');

// var mongoose = require('mongoose');

import connection from './config/database.js';

import Comment from './models/comment.js';
import Post from './models/post.js';
import User from './models/user.js';

// var mongoDB =
//   'mongodb+srv://blogDbAdmin:cMXDDQWYjd71XhkA@blog-cluster.zolyx.mongodb.net/blog-api?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const comments = [];
const commentNumber = 30;
const posts = [];
const postNumber = 15;
const users = [];
const userNumber = 10;

function commentCreate(text, author, cb) {
  commentdetail = { text, author };

  var comment = new Comment(commentdetail);

  comment.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    comments.push(comment);
    cb(null, comment);
  });
}

async function commentsCreate2() {
  try {
    for (let i = 0; i < commentNumber; i++) {
      const commentText = faker.lorem.text();
      const commentAuthor = faker.name.findName();

      const comment = new Comment({
        text: commentText,
        author: commentAuthor,
      });

      const savedComment = await comment.save();

      comments.push(savedComment);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function userCreate(username, password, firstName, lastName, cb) {
  userdetail = {
    username,
    password,
    firstName,
    lastName,
  };

  var user = new User(userdetail);
  user.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    users.push(user);
    cb(null, user);
  });
}

async function usersCreate2() {
  try {
    for (let i = 0; i < userNumber; i++) {
      const username = faker.internet.userName();
      const password = faker.internet.password();
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      const { hash, salt } = genPassword(password);

      const user = new User({
        username,
        firstName,
        lastName,
        hash,
        salt,
      });

      const savedUser = await user.save();

      users.push(savedUser);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function postCreate(title, text, comments, user, published, cb) {
  var post = new Post({ title, text, comments, user, published });

  post.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    posts.push(post);
    cb(null, post);
  });
}

async function postCreate2() {
  try {
    for (let i = 0; i < postNumber; i++) {
      const text = faker.lorem.text();
      const title = faker.lorem.sentence();
      const comments = [];
      for (let j = i * 4; j < i * 4 + 4 && j < commentNumber; j++) {
        comments.push(comments[i]);
      }
      const randomUser = Math.floor(Math.random() * userNumber);
      const user = users[randomUser];
      const published = true;

      const post = new Post({
        title,
        text,
        comments,
        user,
        published,
      });

      const savedPost = await post.save();

      posts.push(savedPost);
    }
  } catch (error) {
    console.error(error.message);
  }
}

function createComments(cb) {
  async.series(
    [
      function (callback) {
        commentCreate('comentario 1', 'Rothfuss', callback);
      },
      function (callback) {
        commentCreate('comentario 2', 'Bova', callback);
      },
      function (callback) {
        commentCreate('comentario 3', 'Asimov', callback);
      },
      function (callback) {
        commentCreate('comentario 5', 'Billings', callback);
      },
      function (callback) {
        commentCreate('comentario 6', 'Jones', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createUser(cb) {
  async.parallel(
    [
      function (callback) {
        userCreate('admin', '123456', 'administrador', 'Admin', callback);
      },
    ],
    // optional callback
    cb
  );
}

function createPosts(cb) {
  async.parallel(
    [
      function (callback) {
        postCreate(
          'Post 1',
          'testo del post 1',
          [comments[0], comments[3]],
          users[0],
          true,
          callback
        );
      },
      function (callback) {
        postCreate(
          'Post 2',
          'testo del post 2',
          [comments[1]],
          users[0],
          false,
          callback
        );
      },
      function (callback) {
        postCreate(
          'Post 3',
          'testo del post 3',
          [comments[4], comments[1]],
          users[0],
          true,
          callback
        );
      },
      function (callback) {
        postCreate('Post 4', 'testo del post 4', [], users[0], true, callback);
      },
      function (callback) {
        postCreate('Post 5', 'testo del post 5', [], users[0], false, callback);
      },
    ],
    // Optional callback
    cb
  );
}

// async.series(
//   [createComments, createUser, createPosts],
//   // Optional callback
//   function (err, results) {
//     if (err) {
//       console.log('FINAL ERR: ' + err);
//     } else {
//       console.log('Done');
//     }
//     // All done, disconnect from database
//     mongoose.connection.close();
//   }
// );

async function main() {
  try {
    await usersCreate2();
    console.log(users);
    await commentsCreate2();
    await postCreate2();
  } catch (error) {
    console.eroor(error.message);
  } finally {
    connection.close();
  }
}

main();
