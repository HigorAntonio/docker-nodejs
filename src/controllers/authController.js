const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const logger = require('../lib/logger');

module.exports = {
  async signUp(req, res) {
    try {
      const { user_name: userName, password } = req.body;

      const user = await User.create({ username: userName, password });
      req.session.user = user;

      return res.sendStatus(201);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },

  async signIn(req, res) {
    try {
      const { user_name: userName, password } = req.body;

      const user = await User.findOne({ username: userName });

      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: 'Incorrect user_name or password' });
      }

      req.session.user = user;

      return res.sendStatus(200);
    } catch (error) {
      logger.error(error);
      return res.sendStatus(500);
    }
  },
};
