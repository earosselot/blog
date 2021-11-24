import { Router } from 'express';

import postController from '../controllers/post.js';
import { isAuth, isAdmin } from '../utils/authentication.js';

const router = Router();

router.get('/', postController.postGet);

router.get('/:postId', postController.postDetailsGet);

router.post('/', isAuth, postController.postPost);

router.put('/:postId', postController.postPut);

router.delete('/:postId', isAuth, postController.postDelete);

export default router;
