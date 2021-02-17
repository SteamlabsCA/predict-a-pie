import './Alert.scss';
import React from 'react';

function Alert({message, level, ...props}) {

  const [messages, setMessages] = React.useState([]);

  window.alert = (message, level) => {
    messages.push({
      message: message,
      level: level ? level : 'status'
    });
    setMessages([...messages]);
  };

  const onDismiss = () => {
    setMessages([, ...messages]);
  };

  return (
    <>
      {messages[0] && (
        <div className={'Alert Alert-' + messages[0].level} onClick={onDismiss}>
          <p>{messages[0].message}</p>
        </div>
      )}
    </>
  );
}

export default Alert;
