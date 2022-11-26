import { Container } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Sets from './pages/Sets';
import { theme } from './theme';

export type AppPage = {
	name: string;
	path: string;
	component: JSX.Element;
};

const App = () => {
	const navbarPages: AppPage[] = [
		{ name: 'Home', path: '/', component: <Home /> },
		{ name: 'Sets', path: '/sets', component: <Sets /> }
	];
	const hiddenPages: AppPage[] = [];

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Navbar title="Flash Cards" pages={navbarPages} />
				<Container maxWidth="xl" sx={{ mt: 2 }}>
					<Routes>
						{[...navbarPages, ...hiddenPages].map(page => (
							<Route
								key={page.name}
								path={page.path}
								element={page.component}
							/>
						))}
						<Route path="/login" element={<Login />} />
					</Routes>
				</Container>
			</BrowserRouter>
		</ThemeProvider>
	);
};

export default App;
