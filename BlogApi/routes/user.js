import { Router } from 'express';

import userController from '../controllers/user.js';
import { isAuth, isAdmin } from '../utils/authentication.js';

const router = Router();

router.get('/me', isAuth, userController.myInfoGet);

router.get('/', isAuth, userController.usersGet);

router.get('/logout', isAuth, userController.userLogout);

router.get('/:userId', isAuth, userController.userGet);

router.post('/login', userController.userLogin);

router.post('/', userController.userPost);

router.put('/', isAuth, userController.userPut);

router.put('/password', isAuth, userController.userPasswordPut);

router.delete('/', isAuth, userController.userDelete);

export default router;
