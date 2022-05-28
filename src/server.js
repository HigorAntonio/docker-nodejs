const app = require('./app');
const logger = require('./lib/logger');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  logger.info(`Server running at port ${PORT}...`);
});
