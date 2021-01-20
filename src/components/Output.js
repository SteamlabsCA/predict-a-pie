import './Output.scss';
import React from 'react';

function Output({active}) {

  return (
    <div className={`Output${active ? ' Output-active' : ''}`}>
      <div className="Neuron-input"></div>
      <div className="Output-check"></div>
    </div>
  );
}

export default Output;
