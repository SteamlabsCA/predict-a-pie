import './NavBar.scss';
import Nav from './Nav';

function NavBar({title, classroom, ...props}) {
  return (
    <header className="NavBar">
      <Nav classroom={classroom} onCommand={props.onCommand} />
      <h1>{title}</h1>
    </header>
  );
}

export default NavBar;
