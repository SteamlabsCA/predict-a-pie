import './Neuron.scss';
import ContentEditable from './ContentEditable';
import React from 'react';

function Neuron({neuron}) {

  const onLabelChange = (value) => {
    neuron.label = value;
  }

  return (
    <div className="Neuron">
      <div className="Neuron-input"></div>
      <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
      <div className="Neuron-output"></div>
    </div>
  )
}

export default Neuron;
