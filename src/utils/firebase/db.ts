import {
	collection,
	CollectionReference,
	doc,
	DocumentReference,
	getFirestore
} from 'firebase/firestore';

import { initFirebase } from './initialize';

initFirebase();
const db = getFirestore();

// Sets
export type FlashcardsSet = {
	name: string;
	userId: string;
};

export const setsCollection = collection(
	db,
	'sets'
) as CollectionReference<FlashcardsSet>;

export const setsDocument = (id: string) =>
	doc(db, 'sets', id) as DocumentReference<FlashcardsSet>;

// Flashcards
export type Flashcard = {
	front: string;
	back: string;
	setId: string;
};

export const flashcardsCollection = collection(
	db,
	'flashcards'
) as CollectionReference<Flashcard>;

export const flashcardsDocument = (id: string) =>
	doc(db, 'flashcards', id) as DocumentReference<Flashcard>;
