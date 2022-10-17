import "./Button.scss";

const Button = (props) => {
  return (
    <button
      className="Button"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
