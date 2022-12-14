import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';
import { getDocs, onSnapshot } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SetsList, { FlashcardsSetWithStats } from '../components/SetsList';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { flashcardsCollection, setsCollection } from '../utils/firebase/db';

const UserSets: FC = () => {
	const [sets, setSets] = useState<FlashcardsSetWithStats[] | null>(null);
	const user = useLoggedInUser();
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onSnapshot(setsCollection, async snapshot => {
			const flashcards = await getDocs(flashcardsCollection);
			setSets(
				snapshot.docs
					.map(doc => ({ ...doc.data(), id: doc.id }))
					.filter(set => set.userId === user?.uid)
					.map(data => ({
						...data,
						flashCardsCount: flashcards.docs.filter(
							doc => doc.data().setId === data.id
						).length
					}))
			);
		});
		return () => {
			unsubscribe();
		};
	}, [setsCollection]);

	useEffect(() => {
		if (!user) {
			navigate('/login');
		}
	}, [user]);

	return (
		<>
			<Box mb={2}>
				<Typography variant="h3" textAlign="center">
					My sets
				</Typography>
			</Box>
			<Box m={2} sx={{ display: 'flex', justifyContent: 'center' }}>
				<Button
					component={Link}
					to="/create"
					variant="contained"
					startIcon={<AddIcon />}
				>
					Create new
				</Button>
			</Box>
			<SetsList sets={sets} />
		</>
	);
};

export default UserSets;
