import React, { useEffect, useRef } from 'react';
import './article.styles.scss';

// Components
import Article from './Article';
import AddArticle from '../AddArticle';
import Spinner from '../common/Spinner/';

// MUI
import { Typography, Grid } from '@mui/material';

// Redux
import { connect } from 'react-redux';
import { getArticles } from '../../redux/actions/dataActions';

// Dependencies
import { isEmpty } from 'lodash';

const ArticleList = ({ ui, data, getArticles }) => {
	const { loading } = ui;
	const { articles } = data;

	const fetchArticles = useRef(null);
	if (!fetchArticles.current) fetchArticles.current = () => getArticles();

	useEffect(() => {
		fetchArticles.current();
	}, []);

	return (
		<div className="articles">
			<div className="articles__container">
				<div className="articles__header">
					<Typography variant="h2" className="articles__title">
						Current list of articles:
					</Typography>
					<div className="articles__header__action-container">
						<AddArticle />
					</div>
				</div>
				<Grid
					container
					spacing={2}
					className="articles__article-container"
				>
					{loading ? (
						<Spinner />
					) : (
						!isEmpty(articles) &&
						articles.map((article) => (
							<Article key={article.uid} article={article} />
						))
					)}
				</Grid>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	ui: state.ui,
	data: state.data,
});
export default connect(mapStateToProps, { getArticles })(ArticleList);
