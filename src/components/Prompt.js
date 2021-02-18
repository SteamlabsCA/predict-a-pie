import './Prompt.scss';
import React from 'react';

function Prompt() {

  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [value, setValue] = React.useState('');

  window.prompt = async (message) => {
    setMessage(message);
    setValue('');
    setVisible(true);
    return new Promise((resolve) => {
      window._promptComponentCallback = resolve;
    });
  };

  const onChange = (event) => {
    setValue(event.target.value);
  }

  const onAccept = () => {
    setVisible(false);
    window._promptComponentCallback(value);
  };

  const onDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="Prompt" onClick={onDismiss}>
          <div className="Prompt-modal" onClick={event => event.stopPropagation()}>
            <p>{message}</p>
            <div className="Prompt-inputs">
              <input type="text" value={value} onChange={onChange} />
              <button onClick={onAccept}>OK</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Prompt;
