let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log('Database connected successfully !', mongoDb.db);
    },
    (error) => {
      console.log('Database error !', error);
    }
  );

const userRoute = require('./node-backend/route/user.route');
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, 'dist/UserCrud')));
app.use(express.static(path.join(__dirname, './public/')));
app.use('/api', userRoute);

const port = process.env.port || 8000;

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log('error 404');
  next(createError(404));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/UserCrud/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port :', port);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});
