const {Router} = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post('/register', authController.registerUserController);
authRouter.post('/login', authController.loginController);
authRouter.patch('/change-pass',authMiddleware, authController.changePasswordController)
authRouter.get('/logout',authController.logoutController)
authRouter.get('/get-me',authMiddleware,authController.getMeController)
module.exports = authRouter;