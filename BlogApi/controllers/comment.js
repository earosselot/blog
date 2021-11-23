import { body, validationResult } from 'express-validator';

import Comment from '../models/comment.js';
import Post from '../models/post.js';

async function commentGet(req, res, next) {
  try {
    const post = await Post.findById(req.params.postId).populate('comments');
    if (!post) throw new Error('Post not found');
    post.comments.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
    res.json(post.comments);
  } catch (error) {
    if (error.message === 'Post not found') error.status = 404;
    next(error);
  }
}

async function commentDetailsGet(req, res, next) {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new Error('Comment with provided id does not exists');
    }
    res.json(comment);
  } catch (error) {
    if (error.kind === 'ObjectId') error.status = 404;
    if (error.message === 'Comment with provided id does not exists')
      error.status = 404;
    next(error);
  }
}

const commentPost = [
  body('text').trim().isLength({ min: 1 }).escape(),
  body('author').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const comment = new Comment({
        text: req.body.text,
        author: req.body.author,
      });

      if (!errors.isEmpty()) {
        throw new Error();
      } else {
        await Post.findByIdAndUpdate(req.params.postId, {
          $push: { comments: comment._id },
        });
        await comment.save();
        res.status = 200;
        res.send();
      }
    } catch (error) {
      error.status = 404;
      next(error);
    }
  },
];

const commentPut = [
  body('text').trim().isLength({ min: 1 }).escape(),
  body('author').trim().isLength({ min: 1 }).escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      const comment = new Comment({
        text: req.body.text,
        author: req.body.author,
        timestamp: new Date(),
        _id: req.params.commentId,
      });

      if (!errors.isEmpty()) {
        throw new Error();
      } else {
        await Comment.findByIdAndUpdate(req.params.commentId, comment);
        res.status(200).send();
      }
    } catch (error) {
      next(error);
    }
  },
];

async function commentDelete(req, res, next) {
  try {
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $pull: { comments: req.params.postId } },
      { safe: true, upsert: true }
    );
    const comment = await Comment.findByIdAndDelete(req.params.commentId);
    if (!comment) throw new Error('Comment not found');
    res.status = 200;
    res.send();
  } catch (error) {
    if (error.message === 'Comment not found') error.status = 404;
    next(error);
  }
}

export default {
  commentGet,
  commentDetailsGet,
  commentPost,
  commentPut,
  commentDelete,
};
