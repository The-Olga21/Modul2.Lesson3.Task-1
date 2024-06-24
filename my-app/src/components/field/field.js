import styles from './field.module.css';
import PropTypes from 'prop-types';

const FieldLayout = ({ field, onClick }) => {
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
							onClick={() => onClick(index)}
						>
							{field[index] ? field[index] : ''}
						</button>
					</li>
				))}
			</ul>
		</>
	);
};

export const Field = ({ field, onClick }) => {
	return <FieldLayout field={field} onClick={onClick} />;
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
