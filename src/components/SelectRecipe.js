import './SelectRecipe.scss';
import React from 'react';

function SelectRecipe({classifications, ...props}) {

  const [value, setValue] = React.useState('Random');

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onSubmit = () => {
    props.onSubmit(value);
  };

  return (
    <div className="SelectRecipe">
      <select onChange={onChange}>
        <option value="Random">Random</option>
        {classifications.map((classification, index) => (
          <option key={index} value={classification}>{classification}</option>
        ))}
      </select>
      <button onClick={onSubmit}>Find Recipe</button>
    </div>
  );
}

export default SelectRecipe;
