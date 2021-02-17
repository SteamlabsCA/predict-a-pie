import './Alert.scss';

function Alert({message, level, ...props}) {
  return (
    <div className={'Alert Alert-' + level} onClick={props.onDismiss}>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
