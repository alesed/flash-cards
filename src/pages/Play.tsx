import { Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import FlashCards from '../components/FlashCards';
import useSetWithFlashcard from '../hooks/useSetWithFlashcard';

const Play: FC = () => {
	const { setId } = useParams<{ setId: string }>();
	const { set, flashcards } = useSetWithFlashcard(setId);

	return (
		<>
			<Typography variant="h3" textAlign="center" mb={2}>
				Practice with flashcards
			</Typography>
			{set && (
				<>
					<Typography variant="h4" textAlign="center" mb={5} color="primary">
						Set: {set?.name}
					</Typography>
					<FlashCards allFlashcards={flashcards ?? []} setId={setId ?? ''} />
				</>
			)}
		</>
	);
};

export default Play;
