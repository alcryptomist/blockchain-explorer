import express from 'express';
import bodyParser from 'body-parser';
import { loggerLevel, serverPort } from 'config/app.conf';
import logger from 'utils/logger';
import httpStatus from 'http-status';
import ApiError from 'presentation/common/exception/ApiError';
import routes from './routes/allRoutes';

const app = express();
app.use(bodyParser.json());

app.use('/', routes);

app.use((req, res, next) => {
  const err = new ApiError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  const response = {
    message: err.isPublic ? err.message : httpStatus[err.status],
  };
  if (loggerLevel === 'debug') response['stack'] = err.stack;
  return res.status(err.status).json(response);
});


app.listen(serverPort, () => {
  logger.info(`server started on port ${serverPort}`);
});

module.exports = app;