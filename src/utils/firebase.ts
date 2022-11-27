import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut as signOutFirebase,
	User
} from 'firebase/auth';

initializeApp({
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: 'flash-cards-pv247.firebaseapp.com',
	projectId: 'flash-cards-pv247',
	storageBucket: 'flash-cards-pv247.appspot.com',
	messagingSenderId: '891025330858',
	appId: '1:891025330858:web:127f5546d0b65c171cb6d3',
	measurementId: 'G-V3EYK18NCP'
});

const auth = getAuth();

export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const signOut = () => signOutFirebase(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
