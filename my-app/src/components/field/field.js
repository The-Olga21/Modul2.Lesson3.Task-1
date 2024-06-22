import styles from './field.module.css';
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

export const Field = ({
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
