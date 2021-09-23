import React, { useState } from 'react';
import './add-article.styles.scss';

// Components
import TextField from '../common/FormFields/TextField';
import Button from '../common/Button/';

// MUI
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material';

// Redux
import { connect } from 'react-redux';
import { addArticle } from '../../redux/actions/dataActions';

// Dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const initialValues = {
	title: '',
	content: '',
};

const AddArticle = ({ ui, addArticle }) => {
	const { loading, errors } = ui;
	const [open, setOpen] = useState(false);
	const [articleData, setArticleData] = useState(initialValues);

	const handleAddArticle = (e) => {
		e.preventDefault();
		addArticle(articleData);
	};
	const toggleOpen = () => setOpen((prevOpen) => !prevOpen);
	const handleChange = (e) =>
		setArticleData({ ...articleData, [e.target.name]: e.target.value });

	return (
		<>
			<Dialog
				className="add-article"
				open={open}
				onClose={toggleOpen}
				fullWidth
				maxWidth="md"
			>
				<DialogTitle>Add Article</DialogTitle>
				<DialogContent>
					<form onSubmit={handleAddArticle}>
						<TextField
							name="title"
							type="text"
							text="Title"
							value={articleData.title}
							onChange={handleChange}
							helperText={errors.title}
							error={!!errors.title}
							fullWidth
						/>
						<TextField
							name="content"
							type="text"
							text="Content"
							value={articleData.content}
							onChange={handleChange}
							helperText={errors.content}
							error={!!errors.content}
							fullWidth
							multiline
							rows={3}
						/>
					</form>
				</DialogContent>
				<DialogActions className="add-article__action-container">
					<Button
						className="add-article__action"
						onClick={toggleOpen}
						variant="text"
					>
						Cancelar
					</Button>
					<Button
						className="add-article__action"
						disabled={loading}
						loading={loading}
						onClick={handleAddArticle}
					>
						Agregar
					</Button>
				</DialogActions>
			</Dialog>
			<Button
				className="rounded"
				title="Add New Article"
				onClick={toggleOpen}
			>
				<FontAwesomeIcon icon={faPlus} size="1x" />
			</Button>
		</>
	);
};

const mapStateToProps = (state) => ({
	ui: state.ui,
});
export default connect(mapStateToProps, { addArticle })(AddArticle);
