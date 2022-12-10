import {
	Box,
	Button,
	Card,
	IconButton,
	keyframes,
	Tooltip,
	Typography
} from '@mui/material';
import { FC, useCallback, useMemo, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

import { Flashcard } from '../utils/firebase/db';
import { Link } from 'react-router-dom';

export type Props = {
	allFlashcards: Flashcard[];
	setId: string;
};

const switchAnimation = keyframes`
	0% {
		transform: scale(1);
	}
	50% {
		transform: scale(1.03);
	}
	100% {
		transform: scale(1);
	}

`;

type IndexedFlashcard = Flashcard & { id: number };

const shuffle = (originalArray: any[]): any[] => {
	const array = [...originalArray];
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

const SetsList: FC<Props> = ({ allFlashcards, setId }: Props) => {
	const [openedSide, setOpenedSide] = useState<'front' | 'back'>('front');
	const [active, setActive] = useState(false);
	const [flashcards, setFlashcards] = useState<IndexedFlashcard[]>(
		shuffle(
			allFlashcards.map((flashcard, index) => ({ ...flashcard, id: index }))
		)
	);
	const [correctlyAnswered, setCorrectlyAnswered] = useState<number | null>(
		null
	);

	const gameFinished = useMemo(
		() => allFlashcards.length && !flashcards.length,
		[flashcards]
	);
	const gameStarted = useMemo(
		() => flashcards && correctlyAnswered !== null,
		[correctlyAnswered]
	);

	const switchCurrentCard = useCallback(() => {
		setActive(true);
		setTimeout(() => {
			setActive(false);
		}, 150);
		setOpenedSide(prev => (prev === 'front' ? 'back' : 'front'));
	}, [flashcards]);

	const getNextCard = (correct: boolean) => {
		if (!flashcards.length) {
			return;
		}
		setCorrectlyAnswered(prev => (prev ?? 0) + (correct ? 1 : 0));
		setFlashcards(prev => {
			const withoutFirstCard = [...prev];
			withoutFirstCard.shift();
			return withoutFirstCard;
		});
	};

	const resetGame = () => {
		setFlashcards(
			shuffle(
				allFlashcards.map((flashcard, index) => ({ ...flashcard, id: index }))
			)
		);
		setCorrectlyAnswered(null);
		setOpenedSide('front');
		setActive(false);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
					width: '900px',
					maxWidth: '100%',
					height: '40vh'
				}}
			>
				{flashcards.slice(0, 2).map((flashcard, index) => (
					<Card
						key={flashcard.id}
						className={active ? 'active' : ''}
						sx={{
							'width': '100%',
							'height': '100%',
							'display': 'flex',
							'alignItems': 'center',
							'justifyContent': 'center',
							'cursor': 'pointer',
							'userSelect': 'none',
							'position': 'absolute',
							'top': 0,
							'zIndex': -index,
							'&.active': {
								animation: `${switchAnimation} .15s ease-in-out`
							}
						}}
						onClick={index === 0 ? switchCurrentCard : undefined}
					>
						<Box>
							<Typography variant="body1" textAlign="center">
								{flashcard[openedSide]}
							</Typography>
						</Box>
					</Card>
				))}
				{gameFinished && (
					<Box
						sx={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flexDirection: 'column'
						}}
					>
						<Typography textAlign="center">
							Congratulation! You have gone through all the cards.
						</Typography>
						<div>
							<Button onClick={() => resetGame()}>Play again</Button>
							<Button component={Link} to={`/set/${setId}`}>
								Return to set
							</Button>
						</div>
					</Box>
				)}
			</Box>
			{flashcards && (
				<Box mt={3} sx={{ display: 'flex' }}>
					<Tooltip title="Answered incorrectly" placement="left" sx={{ mx: 2 }}>
						<IconButton onClick={() => getNextCard(false)}>
							<CancelIcon color="error" fontSize="large" />
						</IconButton>
					</Tooltip>
					<Tooltip title="Answered correctly" placement="right" sx={{ mx: 2 }}>
						<IconButton onClick={() => getNextCard(true)}>
							<CheckCircleIcon color="success" fontSize="large" />
						</IconButton>
					</Tooltip>
				</Box>
			)}
			{gameStarted && (
				<Box mt={3}>
					<Typography>
						Correctly answered: {correctlyAnswered}/
						{allFlashcards.length - flashcards.length}
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default SetsList;
