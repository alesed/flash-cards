import { getDocs, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';

import SetsList from '../components/SetsList';
import {
	flashcardsCollection,
	FlashcardsSet,
	setsCollection
} from '../utils/firebase/db';

export type FlashcardsSetWithStats = FlashcardsSet & {
	id: string;
	flashCardsCount: number;
};

const Sets: FC = () => {
	const [sets, setSets] = useState<FlashcardsSetWithStats[] | null>(null);

	const loadSets = async (snapshot: QuerySnapshot<FlashcardsSet>) => {
		const flashcards = await getDocs(flashcardsCollection);
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
	});

	return <SetsList sets={sets} title="All sets" />;
};

export default Sets;
