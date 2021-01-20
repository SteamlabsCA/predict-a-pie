import './Neuron.scss';
import positive from '../assets/positive.svg';
import negative from '../assets/negative.svg';
import ContentEditable from './ContentEditable';
import Toggle from './Toggle';
import React from 'react';

function Neuron({neuron}) {

  const onLabelChange = (value) => {
    neuron.label = value;
  }

  switch (neuron.type) {

    case 'input':
      return (
        <div className="Neuron">
          <Toggle />
          <div className="Neuron-input"></div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output"></div>
        </div>
      );

    case 'output':
      return (
        <div className="Neuron">
          <div className="Neuron-input Neuron-positive">
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative">
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output"></div>
        </div>
      );

    default:
      return (
        <div className="Neuron">
          <div className="Neuron-input Neuron-positive">
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative">
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output"></div>
        </div>
      );
  }
}

export default Neuron;
