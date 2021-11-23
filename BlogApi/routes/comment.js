import { Router } from 'express';

import commentController from '../controllers/comment.js';
import { isAuth, isAdmin } from '../utils/authentication.js';

const router = Router();

// TODO: preguntar porque los :postId tienen que ir aca para que aparezcan en el objeto req.params
router.get('/:postId/comment/', commentController.commentGet);

router.get('/:postId/comment/:commentId', commentController.commentDetailsGet);

router.post('/:postId/comment/', commentController.commentPost);

router.put('/:postId/comment/:commentId', isAuth, commentController.commentPut);

router.delete(
  '/:postId/comment/:commentId',
  isAuth,
  commentController.commentDelete
);

export default router;
