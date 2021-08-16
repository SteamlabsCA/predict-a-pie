import './DropdownGroup.scss';
import React from 'react';
import SelectPresets from './SelectPresets';

function DropdownGroup({ items, onSubmit, inputIngredients, setDropdownVal, dropdownVal }) {
	const [secondary, setSecondary] = React.useState(items.second[0] && [...items.second[0]]);

	const setChange = (value) => {
		let newArr = items.second[items.first.indexOf(value)];
		setSecondary(newArr);
	};

	return (
		<div className='DropdownGroup'>
			<SelectPresets
				onSubmit={onSubmit}
				primary={true}
				primaryItems={items.first}
				setChange={setChange}
				inputIngredients={inputIngredients}
				setDropdownVal={setDropdownVal}
				dropdownVal={dropdownVal}
			/>
			{items.second.length > 0 && secondary !== undefined && (
				<SelectPresets onSubmit={onSubmit} primary={false} secondaryItems={secondary} setDropdownVal={setDropdownVal} dropdownVal={dropdownVal} />
			)}
		</div>
	);
}

export default DropdownGroup;
