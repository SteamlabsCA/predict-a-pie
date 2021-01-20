import './Toggle.scss';
import React from 'react';

function Toggle() {

  const [active, setActive] = React.useState(false);

  const toggle = () => {
    setActive(!active);
  }

  return (
    <div className={`Toggle${active ? ' Toggle-active' : ''}`} onClick={toggle}>
      <div className="Toggle-well">
        <div className="Toggle-switch"></div>
      </div>
      <div className="Neuron-output"></div>
    </div>
  );
}

export default Toggle;
