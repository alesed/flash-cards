import { Box, Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import introImage from '../assets/intro.webp';

const Home: FC = () => (
	<Grid container sx={{ mt: 5, display: 'flex' }} spacing={4}>
		<Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
			<img src={introImage} style={{ maxWidth: '100%' }} alt="" />
		</Grid>
		<Grid
			item
			xs={12}
			md={6}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<Typography
				fontSize={64}
				mb={4}
				fontWeight={700}
				color="#4a4a4a"
				variant="h1"
			>
				Study effectively with flash cards
			</Typography>
			<Typography fontSize={20} mb={4} variant="subtitle1">
				Our app allows you to simply create a set of flash cards you can
				practise and share with others.
			</Typography>
			<Box>
				<Button component={Link} to="/user-sets" variant="contained">
					Let&apos;s start
				</Button>
			</Box>
		</Grid>
	</Grid>
);

export default Home;
