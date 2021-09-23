const { admin, db } = require('./firebase');
const auth = admin.auth();

module.exports = async (req, res, next) => {
	let idToken;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	) {
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token was found');
		return res.status(403).json({ error: 'Unauthorized' });
	}

	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		req.user = decodedToken;

		const userRegistry = await db
			.collection('users')
			.where('userId', '==', req.user.uid)
			.get();

		req.user.handle = userRegistry?.docs[0]?.data().handle;
		return next();
	} catch (err) {
		console.error('Error while verifying token', err);
		return res.status(403).json(err);
	}
};
