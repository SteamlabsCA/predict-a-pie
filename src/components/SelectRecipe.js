import './SelectRecipe.scss';
import React from 'react';

function SelectRecipe(props) {

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
        <option value="Disgusting">Disgusting</option>
        <option value="Sweet">Sweet</option>
        <option value="Quiche">Quiche</option>
        <option value="Pizza">Pizza</option>
      </select>
      <button onClick={onSubmit}>Find Recipe</button>
    </div>
  );
}

export default SelectRecipe;
