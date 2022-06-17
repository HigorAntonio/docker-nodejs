const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.sendStatus(401);
  }

  req.user = user;

  return next();
};

module.exports = protect;
