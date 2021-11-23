#! /usr/bin/env node
import faker from 'faker';

import { validPassword, genPassword } from './utils/passwordUtils.js';

console.log(
  'This script populates some test users, posts and comments to your database.'
);

import connection from './config/database.js';

import Comment from './models/comment.js';
import Post from './models/post.js';
import User from './models/user.js';

const comments = [];
const commentNumber = 30;
const posts = [];
const postNumber = 15;
const users = [];
const userNumber = 10;

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

async function postCreate2() {
  try {
    for (let i = 0; i < postNumber; i++) {
      const text =
        faker.lorem.paragraphs() +
        faker.lorem.paragraphs() +
        faker.lorem.paragraphs();
      const title = faker.lorem.sentence();
      const postComments = [];
      for (let j = i * 4; j < i * 4 + 4 && j < commentNumber; j++) {
        postComments.push(comments[j]);
      }
      const randomUser = Math.floor(Math.random() * userNumber);
      const user = users[randomUser];
      const published = true;
      const createdAt = faker.date.past();

      const post = new Post({
        title,
        text,
        comments: postComments,
        user,
        published,
        createdAt,
      });

      const savedPost = await post.save();

      posts.push(savedPost);
    }
  } catch (error) {
    console.error(error.message);
  }
}

async function main() {
  try {
    await usersCreate2();
    await commentsCreate2();
    await postCreate2();
    console.log('done succesfully.');
  } catch (error) {
    console.eroor(error.message);
  } finally {
    connection.close();
  }
}

main();
