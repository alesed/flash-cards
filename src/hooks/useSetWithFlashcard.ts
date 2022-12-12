import { getDoc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import {
	Flashcard,
	flashcardsCollection,
	FlashcardsSet,
	setsDocument
} from '../utils/firebase/db';

const useSetWithFlashcard = (setId?: string) => {
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

	return { set, flashcards };
};

export default useSetWithFlashcard;
