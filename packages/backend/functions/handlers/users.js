const { db } = require('../util/firebase');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config);
const auth = firebase.auth();
const { validateSignupData, validateLoginData } = require('../util/validators');

exports.signup = async (req, res) => {
	const newUser = {
		...req.body,
		createdAt: new Date().toISOString(),
	};
	const { valid, errors } = validateSignupData(newUser);
	if (!valid) return res.status(400).json(errors);

	const user = await db
		.collection('users')
		.where('email', '==', newUser.email)
		.get();

	if (user.exists)
		return res.status(400).json({
			email: 'An account with this email already exists',
		});

	const authUser = await auth.createUserWithEmailAndPassword(
		newUser.email,
		newUser.password,
	);

	newUser.uid = authUser?.user?.uid;
	const token = await authUser?.user?.getIdToken();
	const { name, email, createdAt } = newUser;

	try {
		await db.doc(`/users/${newUser.uid}`).set({
			name,
			email,
			createdAt,
		});
		return res.status(201).json({ token });
	} catch (err) {
		console.error(err);
		if (err.code === 'auth/email-already-in-use') {
			return res.status(400).json({
				email: 'An account with this email already exists',
			});
		}
		return res.status(500).json({
			general: 'Something went wrong, please try again',
		});
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	const { valid, errors } = validateLoginData({ email, password });
	if (!valid) return res.status(400).json(errors);

	try {
		const userSignIn = await auth.signInWithEmailAndPassword(
			email,
			password,
		);

		if (userSignIn) {
			const token = await userSignIn?.user?.getIdToken();
			return res.json({ token });
		}
	} catch (err) {
		console.error(err);
		return res.status(403).json({
			general: 'Wrong email/password combination. Please try again',
		});
	}
};

exports.getAutheticatedUser = async (req, res) => {
	try {
		const userData = await db.doc(`/users/${req.user.uid}`).get();

		if (userData.exists) {
			userData.credentials = doc.data();
			userData.credentials.uid = doc.id;
			return res.json(userData);
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.code });
	}
};
