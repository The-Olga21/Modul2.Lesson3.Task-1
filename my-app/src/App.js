import styles from './App.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Information, Field } from './components';

const GameLayout = ({
	field,
	currentPlayer,
	isDraw,
	isGameEnded,
	onClick,
	startAgain,
}) => {
	return (
		<div className={styles.app}>
			<Information
				currentPlayer={currentPlayer}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>

			<Field field={field} onClick={onClick} />
			<button className={styles['new-game-button']} onClick={startAgain}>
				Начать заново
			</button>
		</div>
	);
};

export const Game = () => {
	const [currentPlayer, setCurrentPlayer] = useState('X');
	const [isGameEnded, setIsGameEnded] = useState(false);
	const [isDraw, setIsDraw] = useState(false);
	const [field, setField] = useState(['', '', '', '', '', '', '', '', '']);

	const WIN_PATTERNS = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // Варианты побед по горизонтали
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // Варианты побед по вертикали
		[0, 4, 8],
		[2, 4, 6], // Варианты побед по диагонали
	];

	const onClick = (index) => {
		if (!field[index] && !isGameEnded) {
			field[index] = currentPlayer;
			setField(field);
			if (currentPlayer === 'X') {
				setCurrentPlayer('O');
			} else if (currentPlayer === 'O') {
				setCurrentPlayer('X');
			}
		}
		const isAllFullFieldButtons = field.every((item) => {
			return item;
		});
		for (let i = 0; i < WIN_PATTERNS.length; i++) {
			const [a, b, c] = WIN_PATTERNS[i];
			if (field[a] && field[a] === field[b] && field[a] === field[c]) {
				setIsGameEnded(true);
				setCurrentPlayer(field[a]);
			} else if (field[a] !== field[b] && isAllFullFieldButtons) {
				setIsDraw(true);
			}
		}
	};

	const startAgain = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(['', '', '', '', '', '', '', '', '']);
	};

	return (
		<GameLayout
			field={field}
			setIsDraw={setIsDraw}
			setIsGameEnded={setIsGameEnded}
			setCurrentPlayer={setCurrentPlayer}
			currentPlayer={currentPlayer}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
			setField={setField}
			onClick={onClick}
			startAgain={startAgain}
		/>
	);
};

GameLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};
