import './Alert.scss';
import React from 'react';

function Alert(props) {
	const [message, setMessage] = React.useState(false);
	const [level, setLevel] = React.useState('status');

	window.alert = (message, level) => {
		setMessage(message);
		setLevel(level);
		setTimeout(() => {
			setMessage(false);
		}, 4000);
	};

	return (
		<>
			{message && (
				<div className={'Alert Alert-' + level}>
					<p>{message}</p>
				</div>
			)}
		</>
	);
}

export default Alert;
