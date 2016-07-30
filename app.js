var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var detail = require('./routes/detail');

// mongooseを用いてMongoDBに接続する
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ajax_test');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/detail',detail);
// ToDoスキーマを定義する
var Schema = mongoose.Schema;
var todoSchema = new Schema({
  isCheck     : {type: Boolean, default: false},
  text        : String,
  createdDate : {type: Date, default: Date.now},
  limitDate   : Date
});



// ToDoLスキーマを定義する
var todolSchema = new Schema({
  name        :String,
  data        :[todoSchema],
  numData     : {type: Number, default: 0},
  createdDate : {type: Date, default: Date.now},
  numisCheck  : {type: Number, default: 0},
  key         : {type: Date, default: Date.now} //constant
});

mongoose.model('Todo', todoSchema);
mongoose.model('TodoL', todolSchema);

// /todoにGETアクセスしたとき、ToDo一覧を取得するAPI
app.get('/todo', function(req, res) {
  var Todol = mongoose.model('TodoL');
  // すべてのToDoを取得して送る
  Todol.find({}, function(err, todos) {
    res.send(todos);
  });
});

// /todoにPOSTアクセスしたとき、ToDoを追加するAPI
app.post('/todo', function(req, res) {
  var name = req.body.name;
  // ToDoの名前と期限のパラーメタがあればMongoDBに保存
  if(name) {
    var TodoL = mongoose.model('TodoL');
    var todol = new TodoL();
    todol.name = name;
    todol.save();

    res.send(true);
  } else {
    res.send(false);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
