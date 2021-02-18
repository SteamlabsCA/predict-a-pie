import './ToggleSwitch.scss';
import React from 'react';

function ToggleSwitch({active, ...props}) {

  const toggle = () => {
    props.onToggle(!active);
  }

  const classes = ['ToggleSwitch'];
  if (active) classes.push('ToggleSwitch-active');
  if (props.small) classes.push('ToggleSwitch-small');

  return (
    <div className={classes.join(' ')} onClick={toggle}>
      <div className="ToggleSwitch-well">
        <div className="ToggleSwitch-switch"></div>
      </div>
      <div className="Neuron-output"></div>
      <div className="ToggleSwitch-connector"></div>
    </div>
  );
}

export default ToggleSwitch;
