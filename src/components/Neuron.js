import './Neuron.scss';
import positive from '../assets/positive.svg';
import negative from '../assets/negative.svg';
import ContentEditable from './ContentEditable';
import Output from './Output';
import ToggleSwitch from './ToggleSwitch';
import React from 'react';

function Neuron({neuron, ...props}) {

  const [mouseX, setMouseX] = React.useState(false);
  const [mouseY, setMouseY] = React.useState(false);

  neuron.ref = React.createRef();

  const onLabelChange = (value) => {
    neuron.label = value;
  }

  const onToggle = () => {
    neuron.active = !neuron.active;
    props.onChange();
  }

  const onStartConnection = (event) => {
    event.preventDefault();
    if (props.editable) {
      props.onStartConnection(neuron);
    }
  }

  const onCompleteConnection = (event, weight) => {
    event.preventDefault();
    event.stopPropagation();
    if (props.editable) {
      props.onCompleteConnection(neuron, weight);
    }
  }

  const onMouseDown = (event) => {
    setMouseX(event.clientX);
    setMouseY(event.clientY);
  }

  const onMouseMove = (event) => {
    if (event.buttons) {
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) > 10) {
        getSelection().removeAllRanges();
        if (props.editable) {
          props.onDragStart(neuron);
          neuron.ref.current.focus();
        }
      }
    }
  }

  const onMouseOut = (event) => {
    setMouseX(false);
    setMouseY(false);
  }

  const classes = ['Neuron'];
  if (neuron.active) classes.push('Neuron-active');
  if (props.dragging) classes.push('Neuron-dragging');
  if (props.small) classes.push('Neuron-small');

  switch (neuron.type) {

    case 'input':
      return (
        <div
          id={'n-' + neuron.id}
          className={classes.join(' ')}
          style={props.style}
          ref={neuron.ref}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          <ToggleSwitch onToggle={onToggle} active={props.active} small={props.small} />
          <div className="Neuron-input"></div>
          {props.editable &&
            <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          }
          {!props.editable &&
            <div className="Neuron-title">{neuron.label}</div>
          }
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );

    case 'output':
      return (
        <div
          id={'n-' + neuron.id}
          className={classes.join(' ')}
          style={props.style}
          ref={neuron.ref}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          {props.editable &&
            <>
              <div className="Neuron-input Neuron-positive" onMouseUp={(event) => onCompleteConnection(event, 1)}>
                <img src={positive} alt="Positive terminal" />
              </div>
              <div className="Neuron-input Neuron-negative" onMouseUp={(event) => onCompleteConnection(event, -100)}>
                <img src={negative} alt="Negative terminal" />
              </div>
              <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
            </>
          }
          {!props.editable &&
            <>
              <div className="Neuron-input"></div>
              <div className="Neuron-title">{neuron.label}</div>
            </>
          }
          <div className="Neuron-output"></div>
          <Output
            active={neuron.active}
            confidence={neuron.confidence}
            small={props.small}
          />
        </div>
      );

    default:
      return (
        <div
          id={'n-' + neuron.id}
          className={classes.join(' ')}
          style={props.style}
          ref={neuron.ref}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        >
          <div className="Neuron-input Neuron-positive" onMouseUp={(event) => onCompleteConnection(event, 1)}>
            <img src={positive} alt="Positive terminal" />
          </div>
          <div className="Neuron-input Neuron-negative" onMouseUp={(event) => onCompleteConnection(event, -100)}>
            <img src={negative} alt="Negative terminal" />
          </div>
          <ContentEditable className="Neuron-title" content={neuron.label} onChange={onLabelChange} />
          <div className="Neuron-output" onMouseDown={onStartConnection}></div>
        </div>
      );
  }
}

export default Neuron;
