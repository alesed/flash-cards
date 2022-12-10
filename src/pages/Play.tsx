import { Typography } from '@mui/material';
import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import FlashCards from '../components/FlashCards';
import {
	Flashcard,
	flashcardsCollection,
	FlashcardsSet,
	setsDocument
} from '../utils/firebase/db';

const Play: FC = () => {
	const { setId } = useParams<{ setId: string }>();
	const [set, setSet] = useState<FlashcardsSet | null>(null);
	const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);

	const getData = async () => {
		if (!setId) {
			return;
		}
		const currentSet = await getDoc(setsDocument(setId));
		const flashcards = await getDocs(
			query(flashcardsCollection, where('setId', '==', setId))
		);
		setSet(currentSet.data() ?? null);
		setFlashcards(flashcards.docs.map(doc => doc.data()));
	};

	useEffect(() => {
		getData();
	}, [setId]);

	return (
		<>
			<Typography variant="h3" textAlign="center" mb={2}>
				Practice with flashcards
			</Typography>
			{set && (
				<>
					<Typography variant="h4" textAlign="center" mb={5} color="primary">
						Set: {set?.name}
					</Typography>
					<FlashCards allFlashcards={flashcards ?? []} setId={setId ?? ''} />
				</>
			)}
		</>
	);
};

export default Play;
