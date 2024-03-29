import './Connections.scss';
import scissors from '../assets/scissors.svg';
import React from 'react';

function Connections({ connections, mouseX, mouseY, ...props }) {
	const requestRef = React.useRef();
	const [time, setTime] = React.useState();
	const [cursorStyle, setCursorStyle] = React.useState();
	const isMountedRef = React.useRef(null);

	const animate = (time) => {
		setTime(time);
		requestRef.current = requestAnimationFrame(animate);
	};

	React.useEffect(() => {
		if (isMountedRef.current) {
			requestRef.current = requestAnimationFrame(animate);
			return () => cancelAnimationFrame(requestRef.current);
		}
		return () => (isMountedRef.current = false);
	});

	const outputX = (neuron) => {
		const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
		return rect.left + rect.width - 11;
	};

	const outputY = (neuron) => {
		const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
		return rect.top + rect.height / 2;
	};

	const inputX = (neuron, weight) => {
		if (neuron) {
			const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
			return rect.left + 11;
		} else {
			return mouseX;
		}
	};

	const inputY = (neuron, positive) => {
		if (neuron) {
			const rect = document.querySelector('#n-' + neuron.id).getBoundingClientRect();
			return positive ? rect.top + 15 : rect.top + rect.height - 14;
		} else {
			return mouseY;
		}
	};

	const onMouseMove = (connection, event) => {
		if (connection.to && !connection.editing) {
			setCursorStyle({
				display: 'block',
				left: event.clientX + 'px',
				top: event.clientY + 'px',
			});
			connection.hover = true;
		}
	};

	const onMouseOut = (connection) => {
		setCursorStyle({
			display: 'none',
		});
		connection.hover = false;
	};

	const onDeleteConnection = (connection) => {
		setCursorStyle({
			display: 'none',
		});
		if (!connection.editing) {
			props.onDeleteConnection(connection);
		}
	};

	return (
		<div className='Connections'>
			<svg>
				{connections.map((connection, index) => (
					<g key={index}>
						<line
							x1={outputX(connection.from)}
							y1={outputY(connection.from)}
							x2={inputX(connection.to, connection.positive)}
							y2={inputY(connection.to, connection.positive)}
							className='Connections-hit-area'
							onMouseMove={(event) => {
								onMouseMove(connection, event);
							}}
							onMouseOut={(event) => {
								onMouseOut(connection);
							}}
							onMouseDown={(event) => {
								onDeleteConnection(connection);
							}}
						/>
						<line
							x1={outputX(connection.from)}
							y1={outputY(connection.from)}
							x2={inputX(connection.to, connection.positive)}
							y2={inputY(connection.to, connection.positive)}
							className={'Connections-line' + (connection.from.active ? ' Connections-active' : '') + (connection.hover ? ' Connections-hover' : '')}
						/>
					</g>
				))}
			</svg>
			<img className='Connections-cut' style={cursorStyle} src={scissors} alt='Scissors' />
		</div>
	);
}

export default Connections;
