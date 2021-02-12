import './NavBar.scss';
import Nav from './Nav';

function NavBar({title, ...props}) {
  return (
    <header className="NavBar">
      <Nav onCommand={props.onCommand} />
      <h1>{title}</h1>
    </header>
  );
}

export default NavBar;
