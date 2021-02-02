import './NavBar.scss';
import Nav from './Nav';

function NavBar({title}) {
  return (
    <header className="NavBar">
      <Nav />
      <h1>{title}</h1>
    </header>
  );
}

export default NavBar;
