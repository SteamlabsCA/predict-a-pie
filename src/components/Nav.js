import './Nav.scss';
import menu from '../assets/menu.svg';
import React from 'react';
import { Link } from "react-router-dom";


function Nav({appData, ...props}) {

  const [open, setOpen] = React.useState(false);
  const [menuStyle, setMenuStyle] = React.useState();

  const onClick = (event) => {
    setMenuStyle({
      'left': (event.clientX - 5) + 'px',
      'top': (event.clientY - 5) + 'px'
    });
    setOpen(!open);
  }

  return (
    <div className={open ? 'Nav Nav-open' : 'Nav Nav-closed'} onClick={onClick}>
      <button className="Nav-toggle">
        <img src={menu} alt="Menu icon" />
      </button>
      <nav className="Nav-menu" style={menuStyle}>
        <Link to={ appData.classroom ? `/${appData.classroom.code}` : '/'}>Build a Neural Network</Link>
        <Link to={ appData.classroom ? `/${appData.classroom.code}/trained` : '/trained'}>Test a Trained Network</Link>
        <hr/>
        <a>Load Recipe</a>
        <a>Save Recipe</a>
        <hr/>
        <a onClick={() => {props.onCommand('create-classroom')}} disabled={!appData.connected}>Create Class Code</a>
      </nav>
    </div>
  );
}

export default Nav;
