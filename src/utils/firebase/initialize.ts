import { initializeApp } from 'firebase/app';

export const initFirebase = () =>
	initializeApp({
		apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
		authDomain: 'flash-cards-pv247.firebaseapp.com',
		projectId: 'flash-cards-pv247',
		storageBucket: 'flash-cards-pv247.appspot.com',
		messagingSenderId: '891025330858',
		appId: '1:891025330858:web:127f5546d0b65c171cb6d3',
		measurementId: 'G-V3EYK18NCP'
	});
