import { getDocs, onSnapshot } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';

import SetsList, { FlashcardsSetWithStats } from '../components/SetsList';
import useLoggedInUser from '../hooks/useLoggedInUser';
import {
	flashcardsCollection,
	FlashcardsSet,
	setsCollection
} from '../utils/firebase/db';

const UserSets: FC = () => {
	const [sets, setSets] = useState<FlashcardsSetWithStats[] | null>(null);
	const user = useLoggedInUser();

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
	});

	return <SetsList sets={sets} title="My sets" />;
};

export default UserSets;
