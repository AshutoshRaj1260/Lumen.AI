const express = require("express")
const authController = require("../controllers/auth.controller")
const authValidator = require("../validators/auth.validator")
const identifyUser = require('../middlewares/auth.middleware')

const authRouter = express.Router();

authRouter.post('/register', authValidator.registerValidator, authController.registerController);

authRouter.get('/verify-email', authController.verifyEmailController)

authRouter.post('/login', authController.loginController)

authRouter.get('/get-me', identifyUser, authController.getMeController)

authRouter.post('/logout', identifyUser, authController.logoutController)

module.exports = authRouter;