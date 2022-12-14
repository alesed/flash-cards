import AddIcon from '@mui/icons-material/Add';
import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import { addDoc } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewCard from '../components/NewCard';
import useField from '../hooks/useField';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { flashcardsCollection, setsCollection } from '../utils/firebase/db';

export type FlashcardCreate = {
	id: number;
	question: string;
	answer: string;
};

const addSet = async (
	userId: string,
	title: string,
	checked: boolean
): Promise<string> => {
	const docRef = await addDoc(setsCollection, {
		name: title,
		isPrivate: !checked,
		userId
	});
	return docRef.id;
};

const addFlashcardsToSet = async (
	setId: string,
	cards: FlashcardCreate[]
): Promise<void> => {
	for (const card of cards) {
		await addDoc(flashcardsCollection, {
			setId,
			front: card.question,
			back: card.answer
		});
	}
};

const Create = () => {
	const navigate = useNavigate();
	const user = useLoggedInUser();
	const [cards, setCards] = useState<FlashcardCreate[]>([
		{
			id: 1,
			question: '',
			answer: ''
		}
	]);
	const [checked, setChecked] = useState(true);

	const [title, titleProps] = useField('title', true);

	const handleFormSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!user) return;
		const setId = await addSet(user.uid, title, checked);
		await addFlashcardsToSet(setId, cards);
		navigate('/user-sets');
	};

	const handleAddNextCard = () => {
		const nextId = Math.max(...cards.map(card => card.id)) + 1;
		setCards([...cards, { id: nextId, question: '', answer: '' }]);
	};

	const handleDeleteCard = (id: number) => {
		if (cards.length === 1) return;
		setCards(cards.filter(card => card.id !== id));
	};

	const handleChangeCard = (item: FlashcardCreate) => {
		setCards(
			cards.map(card => {
				if (card.id === item.id) {
					return { ...card, question: item.question, answer: item.answer };
				}
				return card;
			})
		);
	};

	const handleTogglePrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	return (
		<>
			<Typography variant="h3" textAlign="center">
				Create a new set
			</Typography>
			<Paper
				component="form"
				elevation={0}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 2,
					gap: 2
				}}
				onSubmit={handleFormSubmit}
			>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: 1
							}}
						>
							<TextField label="Title" {...titleProps} type="text" />
						</Box>
					</Grid>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-end'
							}}
						>
							<Typography>Visible for everyone</Typography>
							<Switch defaultChecked onChange={handleTogglePrivate} />
						</Box>
					</Grid>
				</Grid>

				<Divider />

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					{cards.map(card => (
						<NewCard
							key={card.id}
							id={card.id}
							deleteCard={handleDeleteCard}
							onChange={handleChangeCard}
						/>
					))}
				</Box>
				<Paper
					onClick={handleAddNextCard}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						p: 2,
						cursor: 'pointer'
					}}
				>
					<AddIcon />
				</Paper>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="contained" type="submit">
						Create
					</Button>
				</Box>
			</Paper>
		</>
	);
};

export default Create;
