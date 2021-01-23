import './ToggleSwitch.scss';
import React from 'react';

function ToggleSwitch(props) {

  const [active, setActive] = React.useState(false);

  const toggle = () => {
    setActive(!active);
    props.onToggle();
  }

  return (
    <div className={`ToggleSwitch${active ? ' ToggleSwitch-active' : ''}`} onClick={toggle}>
      <div className="ToggleSwitch-well">
        <div className="ToggleSwitch-switch"></div>
      </div>
      <div className="Neuron-output"></div>
      <div className="ToggleSwitch-connector"></div>
    </div>
  );
}

export default ToggleSwitch;
