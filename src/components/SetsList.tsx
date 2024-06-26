import { Card, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { FlashcardsSet } from '../utils/firebase/db';

export type Props = {
	sets: FlashcardsSetWithStats[] | null;
};

export type FlashcardsSetWithStats = FlashcardsSet & {
	id: string;
	flashCardsCount: number;
};

const SetsList: FC<Props> = ({ sets }: Props) => {
	const noSets = sets && !sets.length;
	return (
		<>
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
							'mb': 2,
							'transition': 'background-color .5s ease-in-out',
							'&:hover': {
								backgroundColor: '#fbfbfb'
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
