import { FirebaseError } from 'firebase/app';

export const mapFirebaseAuthError = (error: FirebaseError) => {
	switch (error.code) {
		case 'auth/invalid-email':
			return 'Invalid email';
		case 'auth/user-disabled':
			return 'User disabled';
		case 'auth/user-not-found':
			return 'User not found';
		case 'auth/wrong-password':
			return 'Wrong password';
		case 'auth/email-already-in-use':
			return 'Email already in use';
		case 'auth/weak-password':
			return 'Weak password';
		default:
			return 'Unknown error';
	}
};
