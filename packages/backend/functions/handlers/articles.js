const { db } = require('../util/firebase');
const { validateNewTaskData } = require('../util/validators');

exports.getAllArticles = async (req, res) => {
	try {
		const articles = [];
		const articlesData = await db
			.collection('articles')
			.orderBy('createdAt', 'desc')
			.get();

		articlesData.forEach((doc) => {
			const { title, content, createdAt } = doc.data();
			articles.push({
				uid: doc.id,
				title,
				content,
				createdAt,
			});
		});
		return res.json(articles);
	} catch (err) {
		console.error(err);
	}
};

exports.createArticle = async (req, res) => {
	const newArticle = {
		...req.body,
		createdAt: new Date().toISOString(),
	};
	const { valid, errors } = validateNewTaskData(newArticle);
	if (!valid) return res.status(400).json(errors);

	try {
		const addArticleResult = await db
			.collection('articles')
			.add(newArticle);
		newArticle.uid = addArticleResult?.id;
		return res.json(newArticle);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Something went wrong' });
	}
};
