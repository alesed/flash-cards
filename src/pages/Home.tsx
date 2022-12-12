import { Box, Button, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import ViewListIcon from '@mui/icons-material/ViewList';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import introImage from '../assets/intro.webp';

const Home: FC = () => (
	<>
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
					Our app allows you to easily create a set of flash cards. Use them to
					practise or share them with others.
				</Typography>
				<Box>
					<Button component={Link} to="/user-sets" variant="contained">
						Let&apos;s start
					</Button>
				</Box>
			</Grid>
		</Grid>
		<Grid container>
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Typography fontSize={80}>
					<ViewListIcon fontSize="inherit" />
				</Typography>
				<Button component={Link} to="/sets" variant="outlined">
					View public sets
				</Button>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					p: 6
				}}
			>
				<Typography fontSize={80}>
					<AssignmentIndIcon fontSize="inherit" />
				</Typography>

				<Button component={Link} to="/login" variant="outlined">
					Login/Sign up
				</Button>
			</Grid>
		</Grid>
	</>
);

export default Home;
