import './SelectRecipe.scss';
import gtmTrack from '../helpers/gtmTrack';
import React from 'react';
import { strings } from './App';

function SelectRecipe({ classifications, ...props }) {
	const [value, setValue] = React.useState('Random');

	const onChange = (event) => {
		setValue(event.target.value);
	};

	const onSubmit = () => {
		gtmTrack('sec_btn_click', 'Pretrained', 'Find Recipe', value);
		props.onSubmit(value);
	};

	return (
		<div className='SelectRecipe'>
			<select onChange={onChange}>
				<option value='Random'>{strings.random}</option>
				{classifications.map((classification, index) => (
					<option key={index} value={classification}>
						{strings[classification]}
					</option>
				))}
			</select>
			<button onClick={onSubmit}>{strings.findRecipe}</button>
		</div>
	);
}

export default SelectRecipe;
