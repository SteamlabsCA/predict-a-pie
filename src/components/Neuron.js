import './Neuron.scss';
import positive from '../assets/positive.svg';
import negative from '../assets/negative.svg';
import ContentEditable from './ContentEditable';
import Output from './Output';
import ToggleSwitch from './ToggleSwitch';
import React from 'react';
import { strings } from './App';

function Neuron({ neuron, ...props }) {
	const [mouseX, setMouseX] = React.useState(false);
	const [mouseY, setMouseY] = React.useState(false);

	neuron.ref = React.createRef();

	const onLabelChange = (value) => {
		neuron.label = value;
	};

	const onToggle = (value) => {
		neuron.active = value;
		props.onChange();
	};

	const onStartConnection = (event) => {
		event.preventDefault();
		if (props.editable) {
			props.onStartConnection(neuron);
		}
	};

	const onCompleteConnection = (event, positive) => {
		event.preventDefault();
		event.stopPropagation();
		if (props.editable) {
			props.onCompleteConnection(neuron, positive);
		}
	};

	const onAdjustWeights = (event, positive) => {
		event.preventDefault();
		event.stopPropagation();
		if (props.editable) {
			props.onAdjustWeights(neuron, positive);
		}
	};

	const onMouseDown = (event) => {
		setMouseX(event.clientX);
		setMouseY(event.clientY);
	};

	const onMouseMove = (event) => {
		if (event.buttons) {
			const deltaX = event.clientX - mouseX;
			const deltaY = event.clientY - mouseY;
			if (Math.abs(deltaX) < 10 && Math.abs(deltaY) > 5) {
				getSelection().removeAllRanges();
				if (props.editable) {
					props.onDragStart(neuron);
					neuron.ref.current.focus();
				}
			}
		}
	};

	const onMouseOut = (event) => {
		setMouseX(false);
		setMouseY(false);
	};

	const randomLabel = (string) => {
		const stringArr = string.split(',');
		let newLabel = stringArr[Math.floor(Math.random() * stringArr.length)];
		if (newLabel.length > 18) {
			return newLabel.substr(0, 18 - 1) + '...';
		} else {
			return newLabel + '*';
		}
	};

	const classes = ['Neuron'];
	if (neuron.active) classes.push('Neuron-active');
	if (props.dragging) classes.push('Neuron-dragging');
	if (props.small) classes.push('Neuron-small');
	neuron.meter = 'NeuronConnection17363924';

	switch (neuron.type) {
		case 'input':
			return (
				<div
					id={'n-' + neuron.id}
					className={classes.join(' ')}
					style={props.style}
					ref={neuron.ref}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseOut={onMouseOut}
				>
					<ToggleSwitch onToggle={onToggle} active={neuron.active} small={props.small} />
					<div className='Neuron-input'>
						<div className='Neuron-terminal'></div>
					</div>
					{props.editable && <ContentEditable className='Neuron-title' content={neuron.label} onChange={onLabelChange} />}
					{!props.editable && <div className='Neuron-title'>{props.truncate ? randomLabel(strings[neuron.label]) : strings[neuron.label]}</div>}
					<div className='Neuron-output' onMouseDown={onStartConnection}>
						<div className='Neuron-terminal'></div>
					</div>
				</div>
			);

		case 'output':
			return (
				<div
					id={'n-' + neuron.id}
					className={classes.join(' ')}
					style={props.style}
					ref={neuron.ref}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseOut={onMouseOut}
				>
					{props.editable && (
						<>
							<div
								className='Neuron-input Neuron-positive'
								onMouseUp={(event) => onCompleteConnection(event, true)}
								onClick={(event) => onAdjustWeights(event, true)}
							>
								<div className='Neuron-terminal'>
									<img src={positive} alt='Positive terminal' />
								</div>
							</div>
							<div
								className='Neuron-input Neuron-negative'
								onMouseUp={(event) => onCompleteConnection(event, false)}
								onClick={(event) => onAdjustWeights(event, false)}
							>
								<div className='Neuron-terminal'>
									<img src={negative} alt='Negative terminal' />
								</div>
							</div>
							<ContentEditable className='Neuron-title' content={neuron.label} onChange={onLabelChange} />
						</>
					)}
					{!props.editable && (
						<>
							<div className='Neuron-input'>
								<div className='Neuron-terminal'></div>
							</div>
							<div className='Neuron-title'>{strings[neuron.label]}</div>
						</>
					)}
					<div className='Neuron-output'>
						<div className='Neuron-terminal'></div>
					</div>
					<Output active={neuron.active} confidence={neuron.confidence} small={props.small} />
				</div>
			);

		default:
			return (
				<div
					id={'n-' + neuron.id}
					className={classes.join(' ')}
					style={props.style}
					ref={neuron.ref}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseOut={onMouseOut}
				>
					<div
						className='Neuron-input Neuron-positive'
						onMouseUp={(event) => onCompleteConnection(event, true)}
						onClick={(event) => onAdjustWeights(event, true)}
					>
						<div className='Neuron-terminal'>
							<img src={positive} alt='Positive terminal' />
						</div>
					</div>
					<div
						className='Neuron-input Neuron-negative'
						onMouseUp={(event) => onCompleteConnection(event, false)}
						onClick={(event) => onAdjustWeights(event, false)}
					>
						<div className='Neuron-terminal'>
							<img src={negative} alt='Negative terminal' />
						</div>
					</div>
					<ContentEditable className='Neuron-title' content={neuron.label} onChange={onLabelChange} />
					<div className='Neuron-output' onMouseDown={onStartConnection}>
						<div className='Neuron-terminal'></div>
					</div>
				</div>
			);
	}
}

export default Neuron;
