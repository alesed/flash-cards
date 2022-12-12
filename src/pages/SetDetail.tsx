import ViewCarousel from '@mui/icons-material/ViewCarousel';
import { Button, Card, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { FC } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import useSetWithFlashcard from '../hooks/useSetWithFlashcard';
import { theme } from '../utils/theme';

const SetDetail: FC = () => {
	const { setId } = useParams<{ setId: string }>();
	const { set, flashcards } = useSetWithFlashcard(setId);

	return (
		<>
			<Typography variant="h3" textAlign="center" mb={2}>
				Set: {set?.name}
			</Typography>
			<Box
				mb={3}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					gap: 2,
					[theme.breakpoints.up('md')]: {
						flexDirection: 'row'
					}
				}}
			>
				<Button
					component={Link}
					to={`/set/${setId}/play`}
					variant="contained"
					startIcon={<ViewCarousel />}
				>
					Practice with flashcards
				</Button>
				<Button
					component={Link}
					to="/sets"
					variant="contained"
					startIcon={<MenuIcon />}
				>
					Other sets
				</Button>
			</Box>
			<Typography variant="h5" textAlign="left" mb={3}>
				Cards in this set:
			</Typography>
			{flashcards?.map((flashcard, index) => (
				<Card
					key={index}
					sx={{
						p: 3,
						mb: 2
					}}
				>
					<Grid container>
						<Grid item sx={{ pr: 2 }} xs={12} md={6}>
							<Typography>{flashcard.front}</Typography>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography>{flashcard.back}</Typography>
						</Grid>
					</Grid>
				</Card>
			))}
		</>
	);
};

export default SetDetail;
