import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect } from 'react';

import useField from '../hooks/useField';
import { FlashcardCreate } from '../pages/Create';

type Props = {
	id: number;
	deleteCard: (id: number) => void;
	onChange: (item: FlashcardCreate) => void;
};

const NewCard: FC<Props> = ({ id, deleteCard, onChange }) => {
	const [question, questionProps] = useField('question', true);
	const [answer, answerProps] = useField('answer', true);

	useEffect(() => {
		onChange({ id, question, answer });
	}, [id, question, answer]);

	return (
		<Paper sx={{ p: 2 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} md={5}>
					<Box>
						<TextField
							sx={{ width: '100%' }}
							label="Question"
							{...questionProps}
							type="text"
						/>
					</Box>
				</Grid>
				<Grid item xs={12} md={5}>
					<Box>
						<TextField
							sx={{ width: '100%' }}
							label="Answer"
							{...answerProps}
							type="text"
						/>
					</Box>
				</Grid>
				<Grid
					item
					xs={12}
					md={2}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						cursor: 'pointer'
					}}
				>
					<Box>
						<Button startIcon={<DeleteIcon />} onClick={() => deleteCard(id)}>
							Remove
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default NewCard;
