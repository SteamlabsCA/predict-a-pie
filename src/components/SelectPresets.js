import './SelectPresets.scss';
import gtmTrack from '../helpers/gtmTrack';
import React from 'react';
import { strings } from './App';

function SelectPresets({ primary, ...props }) {
	const [value, setValue] = React.useState([...(props.primaryItems || (props.secondaryItems ? props.secondaryItems : [false]))][0]);
	const [list, setList] = React.useState([...(props.primaryItems || (props.secondaryItems ? props.secondaryItems : [false]))]);

	React.useEffect(() => {
		if (props.secondaryItems !== undefined && props.secondaryItems) {
			setList([...props.secondaryItems]);
		}
	}, [props.secondaryItems]);

	const onChange = (event) => {
		if (primary) props.setChange(event.target.value);
		setValue(event.target.value);
	};

	const onSubmit = () => {
		// gtmTrack('sec_btn_click', 'Pretrained', 'Find Recipe', value);
		props.onSubmit(value, primary);
	};

	return (
		<>
			{(props.primaryItems || props.secondaryItems) && (
				<div className='SelectPresets'>
					<select onChange={onChange}>
						{list.map((item, index) => (
							<option key={index} value={item}>
								{strings[item]}
							</option>
						))}
					</select>
					<button onClick={onSubmit}>{strings.updateModel}</button>
				</div>
			)}
		</>
	);
}

export default SelectPresets;
