import './NavBar.scss';
import Nav from './Nav';

function NavBar({title, appData, ...props}) {
  return (
    <header className="NavBar">
      <Nav appData={appData} route={props.route} onCommand={props.onCommand} />
      <h1>{title}</h1>
    </header>
  );
}

export default NavBar;
