import {
	Box,
	Container,
	Divider,
	Paper,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { FormEvent } from 'react';

import NewCard from '../components/NewCard/NewCard';
import useField from '../hooks/useField';

const handleFormSubmit = async (e: FormEvent) => {
	e.preventDefault();
	// TODO:
};

const Create = () => {
	const [title, titleProps] = useField('title', true);
	const [description, descriptionProps] = useField('description');

	return (
		<Container maxWidth="lg">
			<Paper
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
				onSubmit={handleFormSubmit}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Create a new set
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Box
						sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}
					>
						<TextField label="Title" {...titleProps} type="text" />
						<TextField label="Description" {...descriptionProps} type="text" />
					</Box>
					<Box
						sx={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'end',
							justifyContent: 'end'
						}}
					>
						<Typography>Visible for everyone</Typography>
						{/* TODO: map to a variable */}
						<Switch defaultChecked />
					</Box>
				</Box>
				<Divider />
				<Box>
					{/* TODO: array of AddCard components */}
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					<NewCard />
					{/* TODO: Add a card component */}
				</Box>
				{/* TODO: Create button */}
			</Paper>
		</Container>
	);
};

export default Create;
