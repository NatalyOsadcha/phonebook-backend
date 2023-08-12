const express = require('express');

const usersRouter = express.Router();

const { signup, login } = require('../controllers/userControllers');

const { validateBody, signupSchema, loginSchema } = require('../middlewares/userValidator');

usersRouter.post('/signup',validateBody(signupSchema), signup);

usersRouter.post('/login',validateBody(loginSchema),login);

usersRouter.post('/logout',);

usersRouter.get('/current',);

module.exports = usersRouter;



