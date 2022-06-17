const express = require('express');

const protect = require('./middlewares/authMiddleware');
const authController = require('./controllers/authController');
const postController = require('./controllers/postController');

const routes = express.Router();

// authController
routes.post('/api/v1/signup', authController.signUp);
routes.post('/api/v1/signin', authController.signIn);

// postController
routes.get('/api/v1/posts', postController.index);
routes.post('/api/v1/posts', protect, postController.create);
routes.get('/api/v1/posts/:id', postController.show);
routes.patch('/api/v1/posts/:id', postController.update);
routes.delete('/api/v1/posts/:id', postController.delete);

module.exports = routes;
