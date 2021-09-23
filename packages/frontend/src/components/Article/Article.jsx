import React from 'react';
import './article.styles.scss';

// MUI
import { Typography, Grid, Card, CardContent } from '@mui/material';

const Article = ({ article }) => {
	const { title, content } = article;
	return (
		<Grid item className="articles__article" md={6} sm={12}>
			<Card className="articles__article__container" spacing={2}>
				<CardContent>
					<Typography
						variant="h3"
						className="articles__article__title"
					>
						{title}
					</Typography>
					<Typography className="articles__article__content">
						{content}
					</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Article;
