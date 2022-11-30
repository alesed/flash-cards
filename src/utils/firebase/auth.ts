import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as signOutFirebase,
	User
} from 'firebase/auth';

import { initFirebase } from './initialize';

initFirebase();
const auth = getAuth();

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => signOutFirebase(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
