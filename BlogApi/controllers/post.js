import { body, validationResult } from 'express-validator';

import Post from '../models/post.js';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import { isAdminOrOwner } from '../utils/authentication.js';


async function postGet(req, res, next) {
  const populate = req.query.populate;
  let posts;
  if (populate === 'user') {
    posts = await Post.find({}, 'title user text createdAt published')
      .populate(populate, '_id firstName lastName username admin');
  } else {
    posts = await Post.find({}, 'title user text createdAt published');
  }
  res.json(posts);
}

async function postDetailsGet(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId).populate(
      'user',
      'firstName lastName'
    );
    if (!post) {
      throw new Error('Post does not exists');
    }
    res.json(post);
  } catch (error) {
    if (error.kind === 'ObjectId') error.status = 404;
    if (error.message === 'Post does not exists') error.status = 404;
    next(error);
  }
}

const postPost = [
  // Validate and sanitize fields
  body('title').trim().isLength({ min: 3 }),
  body('text').trim().isLength({ min: 3 }),

  // Process reques after validation and sanitization
  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const post = new Post({
        title: req.body.title,
        text: req.body.text,
        comments: [],
        user: req.user._id,
        published: req.body.published,
      });

      if (!errors.isEmpty()) {
        throw new Error('validation errors');
      } else {
        await post.save();
        res.status = 200;
        res.send();
      }
    } catch (error) {
      if (error.message === 'validation errors') error.status = 400;
      next(error);
    }
  },
];

const postPut = [
  body('title').trim().isLength({ min: 3 }),
  body('text').trim().isLength({ min: 3 }),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const error = new Error('validation errors');
        error.status = 400;
        throw error;
      } else {
        const post = Post.findById(req.params.id);

        // isAdminOrOwner(req.user, post.user);

        const editedPost = {
          title: req.body.title,
          text: req.body.text,
          createdAt: req.body.createdAt,
          published: req.body.published,
        };

        await Post.findByIdAndUpdate(req.params.postId, editedPost);
        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  },
];

async function postDelete(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) throw new Error('Post not found');

    // const isOwner = post.user._id.toString() === req.user._id.toString();
    // const isAdmin = req.user.admin;
    // if (!isAdmin && !isOwner) {
    //   const error = new Error('Not authorized');
    //   error.status = 401;
    //   throw error;
    // }

    await Promise.all(
      post.comments.map((commentId) => {
        Comment.findByIdAndDelete(commentId);
      })
    );
    await Post.findByIdAndDelete(req.params.postId);

    res.status = 200;
    res.json({ message: 'post deleted successfully' });
  } catch (error) {
    if (error.message === 'Post not found') error.status = 404;
    next(error);
  }
}

export default { postGet, postPost, postDetailsGet, postPut, postDelete };
