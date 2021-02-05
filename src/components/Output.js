import check from '../assets/check.svg';
import './Output.scss';
import React from 'react';

function Output({active, ...props}) {

  const classes = ['Output'];
  if (active) classes.push('Output-active');
  if (props.small) classes.push('Output-small');

  return (
    <div className={classes.join(' ')}>
      <div className="Neuron-input"></div>
      <div className="Output-connector"></div>
      <div className="Output-check">
        <img src={check} alt="Check mark" />
      </div>
    </div>
  );
}

export default Output;
