import { Router } from 'express';

import userController from '../controllers/user.js';
import { isAuth, isAdmin } from '../utils/authentication.js';

const router = Router();

router.get('/', isAuth, userController.usersGet);

router.get('/logout', isAuth, userController.userLogout);

router.get('/:userId', userController.userGet);

router.post('/', userController.userPost);

router.post('/login', userController.userLogin);

router.put('/', isAuth, userController.userPut);

router.put('/password', isAuth, userController.userPasswordPut);

router.delete('/', isAuth, userController.userDelete);

export default router;
