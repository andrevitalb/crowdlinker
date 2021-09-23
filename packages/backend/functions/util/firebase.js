const admin = require('firebase-admin');
const config = require('./config');
const serviceAccount = require('../key/serviceAccountKey.json');

admin.initializeApp({
	...config,
	credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = { admin, db };
