import { Box, Card, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FlashcardsSet } from '../utils/firebase/db';

export type Props = {
	sets: FlashcardsSetWithStats[] | null;
	title: string;
};

export type FlashcardsSetWithStats = FlashcardsSet & {
	id: string;
	flashCardsCount: number;
};

const SetsList: FC<Props> = ({ sets, title }: Props) => {
	const noSets = sets && !sets.length;
	return (
		<>
			<Box>
				<Typography variant="h3" textAlign="center">
					{title}
				</Typography>
			</Box>

			{noSets && (
				<Typography
					variant="h5"
					textAlign="center"
					sx={{ fontWeight: 'light', mt: 3 }}
				>
					No sets found
				</Typography>
			)}

			{sets?.map(set => (
				<Link
					key={set.name}
					to={`/set/${set.id}`}
					style={{ textDecoration: 'none', color: 'inherit' }}
				>
					<Card
						sx={{
							'display': 'flex',
							'flexDirection': 'row',
							'justifyContent': 'space-between',
							'p': 3,
							'&:hover': {
								backgroundColor: 'primary.light'
							}
						}}
					>
						<Typography>{set.name}</Typography>
						<Typography>{set.flashCardsCount} flashcards</Typography>
					</Card>
				</Link>
			))}
		</>
	);
};

export default SetsList;
