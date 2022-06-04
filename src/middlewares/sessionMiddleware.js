const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = require('../lib/redisClient');

const SESSION_SECRET = process.env.SESSION_SECRET;
const SESSION_COOKIE_MAX_AGE = Number(process.env.SESSION_COOKIE_MAX_AGE);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: SESSION_COOKIE_MAX_AGE,
  },
});

module.exports = sessionMiddleware;
