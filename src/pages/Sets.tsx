import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
	getDocs,
	onSnapshot,
	query,
	QuerySnapshot,
	where
} from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';

import SetsList, { FlashcardsSetWithStats } from '../components/SetsList';
import {
	flashcardsCollection,
	FlashcardsSet,
	setsCollection
} from '../utils/firebase/db';

const Sets: FC = () => {
	const [sets, setSets] = useState<FlashcardsSetWithStats[] | null>(null);

	const loadSets = async (snapshot: QuerySnapshot<FlashcardsSet>) => {
		const flashcards = await getDocs(
			query(flashcardsCollection, where('isPrivate', '==', false))
		);
		setSets(
			snapshot.docs
				.map(doc => ({ ...doc.data(), id: doc.id }))
				.map(data => ({
					...data,
					flashCardsCount: flashcards.docs.filter(
						doc => doc.data().setId === data.id
					).length
				}))
		);
	};

	useEffect(() => {
		const unsubscribe = onSnapshot(setsCollection, loadSets);
		return () => {
			unsubscribe();
		};
	}, [setsCollection]);

	return (
		<>
			<Box mb={2}>
				<Typography variant="h3" textAlign="center">
					All sets
				</Typography>
			</Box>
			<SetsList sets={sets} />
		</>
	);
};

export default Sets;
