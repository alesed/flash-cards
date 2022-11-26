import { initializeApp } from 'firebase/app';
import {
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User
} from 'firebase/auth';

console.log(import.meta.env.FIREBASE_API_KEY);

initializeApp({
	apiKey:
		import.meta.env.FIREBASE_API_KEY ||
		'AIzaSyAim1WrJhJS_Nq63fSR60PWLgSqjmZrHEY',
	authDomain: 'flash-cards-pv247.firebaseapp.com',
	projectId: 'flash-cards-pv247',
	storageBucket: 'flash-cards-pv247.appspot.com',
	messagingSenderId: '891025330858',
	appId: '1:891025330858:web:127f5546d0b65c171cb6d3',
	measurementId: 'G-V3EYK18NCP'
});

const auth = getAuth();

export const register = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

export const login = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);
