import styles from './App.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Information, Field } from './components';

const GameLayout = ({
	field,
	setIsDraw,
	setIsGameEnded,
	setCurrentPlayer,
	currentPlayer,
	isDraw,
	isGameEnded,
	setField,
}) => {
	const startAgain = () => {
		setCurrentPlayer('X');
		setIsGameEnded(false);
		setIsDraw(false);
		setField(['', '', '', '', '', '', '', '', '']);
	};
	return (
		<div className={styles.app}>
			<Information
				setIsDraw={setIsDraw}
				setIsGameEnded={setIsGameEnded}
				setCurrentPlayer={setCurrentPlayer}
				currentPlayer={currentPlayer}
				isDraw={isDraw}
				isGameEnded={isGameEnded}
			/>

			<Field
				field={field}
				setCurrentPlayer={setCurrentPlayer}
				currentPlayer={currentPlayer}
				setField={setField}
				isGameEnded={isGameEnded}
				setIsGameEnded={setIsGameEnded}
				setIsDraw={setIsDraw}
			/>
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
		/>
	);
};

GameLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};
