import ThemeProvider from '@mui/material/styles/ThemeProvider';

import Navbar from './components/Navbar/Navbar';
import { theme } from './theme';

const App = () => {
	const pages = ['Sets', 'Create new']; // TODO: Adjust according to our app

	return (
		<ThemeProvider theme={theme}>
			<Navbar title="Flash Cards" pages={pages} />
			<div>test</div>
		</ThemeProvider>
	);
};

export default App;
