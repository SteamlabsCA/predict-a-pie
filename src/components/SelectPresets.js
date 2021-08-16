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
		let targetVal = event.target.value;
		let msg = props.inputIngredients ? props.inputIngredients.Standard.message : 0;
		let curVal = targetVal === msg ? 'Standard' : targetVal;
		if (primary) {
			props.setDropdownVal({ ...props.dropdownVal, first: curVal });
			props.setChange(curVal);
		} else {
			props.setDropdownVal({ ...props.dropdownVal, second: targetVal });
		}
		setValue(curVal);
	};

	const onSubmit = () => {
		// gtmTrack('sec_btn_click', 'Pretrained', 'Find Recipe', value);
		if (primary) {
			props.onSubmit(value, primary);
		} else {
			let curVal = props.dropdownVal.second === -1 ? list[0] : value;
			setValue(curVal);
			props.onSubmit(curVal, primary);
		}
	};

	React.useEffect(() => {
		if (props.primaryItems) {
			let arr = [...list];
			arr[arr.indexOf('Standard')] = props.inputIngredients.Standard.message;
			setList([...arr]);
		}
	}, []);

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
