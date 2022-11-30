import {
	Box,
	Button,
	Container,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { FirebaseError } from 'firebase/app';
import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import { signIn, signUp } from '../utils/firebase/auth';
import { mapFirebaseAuthError } from '../utils/firebase/error-mapping';

const Login: FC = () => {
	const navigate = useNavigate();

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [isSignUp, setIsSignUp] = useState(false);
	const [submitError, setSubmitError] = useState<string>();

	const handleFormSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			isSignUp ? await signUp(email, password) : await signIn(email, password);
			navigate('/');
		} catch (error) {
			const firebaseError = error as FirebaseError;
			const message = mapFirebaseAuthError(firebaseError);
			setSubmitError(message);
		}
	};

	return (
		<Container maxWidth="md">
			<Paper
				component="form"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
				onSubmit={handleFormSubmit}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Login
				</Typography>
				<TextField label="Email" {...usernameProps} type="email" />
				<TextField label="Password" {...passwordProps} type="password" />
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						alignSelf: 'flex-end',
						mt: 2
					}}
				>
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
					<Button
						type="submit"
						variant="outlined"
						onClick={() => setIsSignUp(true)}
					>
						Sign Up
					</Button>
					<Button
						type="submit"
						variant="contained"
						onClick={() => setIsSignUp(false)}
					>
						Sign In
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
