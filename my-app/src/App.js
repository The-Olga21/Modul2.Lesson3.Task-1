import styles from './App.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FieldLayout = ({
	field,
	setCurrentPlayer,
	currentPlayer,
	setField,
	isGameEnded,
	setIsGameEnded,
	setIsDraw,
}) => {
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

	return (
		<>
			<ul className={styles['field-button-row']}>
				{field.map((item, index) => (
					<li
						className={styles['field-button-row-container']}
						key={Math.random()}
					>
						<button
							className={styles['field-button']}
							onClick={(e) => onClick(index)}
						>
							{field[index] ? field[index] : ''}
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

const Field = ({
	field,
	setCurrentPlayer,
	currentPlayer,
	setField,
	isGameEnded,
	setIsGameEnded,
	setIsDraw,
}) => {
	return (
		<FieldLayout
			field={field}
			setCurrentPlayer={setCurrentPlayer}
			currentPlayer={currentPlayer}
			setField={setField}
			isGameEnded={isGameEnded}
			setIsGameEnded={setIsGameEnded}
			setIsDraw={setIsDraw}
		/>
	);
};

const InformationLayout = ({
	setIsDraw,
	setIsGameEnded,
	setCurrentPlayer,
	currentPlayer,
	isDraw,
	isGameEnded,
}) => {
	return (
		<div className={styles.information}>
			{isDraw
				? 'Ничья'
				: isGameEnded
					? `Победа: ${currentPlayer}`
					: `Ходит: ${currentPlayer}`}
		</div>
	);
};

const Information = ({
	setIsDraw,
	setIsGameEnded,
	setCurrentPlayer,
	currentPlayer,
	isDraw,
	isGameEnded,
}) => {
	return (
		<InformationLayout
			setIsDraw={setIsDraw}
			setIsGameEnded={setIsGameEnded}
			setCurrentPlayer={setCurrentPlayer}
			currentPlayer={currentPlayer}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
		/>
	);
};

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

Information.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};

InformationLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};

Field.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};

FieldLayout.propTypes = {
	currentPlayer: PropTypes.string,
	isDraw: PropTypes.bool,
	isGameEnded: PropTypes.bool,
};
