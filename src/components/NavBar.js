import './NavBar.scss';

function NavBar({title}) {
  return (
    <header className="NavBar">
      <h1>{title}</h1>
    </header>
  );
}

export default NavBar;
