import check from '../assets/check.svg';
import './Output.scss';
import React from 'react';

function Output({active}) {

  return (
    <div className={`Output${active ? ' Output-active' : ''}`}>
      <div className="Neuron-input"></div>
      <div className="Output-connector"></div>
      <div className="Output-check">
        <img src={check} alt="Check mark" />
      </div>
    </div>
  );
}

export default Output;
