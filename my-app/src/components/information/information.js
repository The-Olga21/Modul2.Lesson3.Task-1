import styles from './information.module.css';
import PropTypes from 'prop-types';

const InformationLayout = ({ currentPlayer, isDraw, isGameEnded }) => {
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

export const Information = ({ currentPlayer, isDraw, isGameEnded }) => {
	return (
		<InformationLayout
			currentPlayer={currentPlayer}
			isDraw={isDraw}
			isGameEnded={isGameEnded}
		/>
	);
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
