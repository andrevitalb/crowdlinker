const functions = require('firebase-functions');
const app = require('express')();

const { getAllArticles, createArticle } = require('./handlers/articles');
const { signup, login, getAutheticatedUser } = require('./handlers/users');
const FirebaseAuth = require('./util/firebaseAuth');

const cors = require('cors');
app.use(cors());

// Article routes
app.get('/articles', FirebaseAuth, getAllArticles);
app.post('/article', FirebaseAuth, createArticle);

// User routes
app.post('/signup', signup);
app.post('/login', login);
app.get('/user', FirebaseAuth, getAutheticatedUser);

exports.api = functions.region('us-central').https.onRequest(app);
