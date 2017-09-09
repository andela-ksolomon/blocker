import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import path from 'path';
import http from 'http';
import dotenv from 'dotenv';
import BodyParser from 'body-parser';
import log from 'log-with-colors';
import webpackHotMidlleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

import UserRouter from './routes/UserRoutes';
import QuestionRouter from './routes/QuestionRoutes';
import AnswerRouter from './routes/AnswerRoutes';
import VoteRouter from './routes/VotesRoutes';

dotenv.load();
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
const app = express(),
  compiler = webpack(webpackConfig);

app.use(express.static(path.join(__dirname, '../../')));

app.use(webpackMiddleware(compiler));

app.use(webpackHotMidlleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: false
}));

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: false
}));

app.use('/users', UserRouter);
app.use('/questions', QuestionRouter);
app.use('/answers', AnswerRouter);
app.use('/votes', VoteRouter);

app.use(logger('dev'));

app.get('*', (req, res) => res.status(200)
.sendFile(path.join(__dirname, '../client/index.html')));


server.listen(port, (error) => {
  if (!error) {
    log.success(`listening to app ${port}`);
  } else {
    log.error(error);
  }
});

export default app;

