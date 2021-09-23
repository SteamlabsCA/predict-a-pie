import './Tooltip.scss';
import React from 'react';
import Neuron from './Neuron';

function Tooltip({ text, neuron, onChange, index, long, standard, ...props }) {
	return (
		<div className='Tooltip' data-tooltip={text}>
			<Neuron list={props.list} truncate={long} standard={standard} neuron={neuron} onChange={() => onChange(index)} small />
		</div>
	);
}

export default Tooltip;
