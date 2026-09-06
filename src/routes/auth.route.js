const {Router} = require('express');
const authRouter = Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/register', authController.registerUserController);
authRouter.post('/login', authController.loginController);
authRouter.patch('/change-pass',authController.changePasswordController)
module.exports = authRouter;