const Post = require('../models/postModel');
const logger = require('../lib/logger');

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.find();

      return res.json({
        status: 'success',
        results: posts.length,
        data: {
          posts,
        },
      });
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },

  async show(req, res) {
    try {
      const { id: postId } = req.params;

      const post = await Post.findById(postId);

      if (!post) {
        return res.status(400).json({ message: 'Post not found' });
      }

      return res.json({
        status: 'success',
        data: {
          post,
        },
      });
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },

  async create(req, res) {
    try {
      const { title, body } = req.body;

      await Post.create({ title, body });

      return res.sendStatus(201);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },

  async update(req, res) {
    try {
      const { id: postId } = req.params;
      const { title, body } = req.body;

      await Post.findByIdAndUpdate(
        postId,
        { title, body },
        {
          runValidators: true,
        }
      );

      return res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },

  async delete(req, res) {
    try {
      const { id: postId } = req.params;

      await Post.findByIdAndDelete(postId);

      return res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },
};
