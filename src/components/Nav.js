import './Nav.scss';
import React from 'react';
import PretrainedNav from './PretrainedNav';
import gtmTrack from '../helpers/gtmTrack';
import menu from '../assets/menu.svg';
import { Link } from 'react-router-dom';
import { strings } from './App';

function Nav({ appData, ...props }) {
	const [open, setOpen] = React.useState(false);
	const [menuStyle, setMenuStyle] = React.useState();
	const onClick = (event) => {
		if (!event.target.className.includes('stayOpen')) {
			setOpen(!open);
			setMenuStyle({
				left: event.clientX - 5 + 'px',
				top: event.clientY - 5 + 'px',
			});
		}
	};

	return (
		<div className={open ? 'Nav Nav-open' : 'Nav Nav-closed'} onClick={onClick}>
			<button className='Nav-toggle'>
				<img src={menu} alt='Menu icon' />
			</button>
			<nav className='Nav-menu' style={menuStyle}>
				<Link
					onClick={() => gtmTrack('prm_btn_click', 'Instructions', 'Instructions', '')}
					to={appData.classroom ? `/${appData.classroom.code}` : '/'}
				>
					{strings.instructions}
				</Link>
				<Link onClick={() => gtmTrack('prm_btn_click', 'Build', 'Build', '')} to={appData.classroom ? `/${appData.classroom.code}/build` : '/build'}>
					{strings.buildNetwork}
				</Link>
				<PretrainedNav appData={appData} mainOpen={open} />
				<Link
					onClick={() => gtmTrack('prm_btn_click', 'ClassStats', 'ClassStats', '')}
					to={appData.classroom ? `/${appData.classroom.code}/stats` : ''}
					disabled={!appData.classroom}
				>
					{strings.viewStats}
				</Link>
				<hr />
				{appData.classroom && (
					<>
						<a
							onClick={() => {
								props.onCommand('leave-classroom');
								gtmTrack('sec_btn_click', 'Class', 'Leave Class', '');
							}}
							disabled={!appData.connected}
						>
							{strings.leaveClassroom}
						</a>
					</>
				)}
				{!appData.classroom && (
					<>
						<a
							onClick={() => {
								props.onCommand('join-classroom');
								gtmTrack('sec_btn_click', 'Class', 'Join Class', '');
							}}
							disabled={!appData.connected}
						>
							{strings.joinClassroom}
						</a>
						<a
							onClick={() => {
								props.onCommand('create-classroom');
								gtmTrack('sec_btn_click', 'Class', 'Create Class', '');
							}}
							disabled={!appData.connected}
						>
							{strings.createClassroom}
						</a>
					</>
				)}
				<hr />
				{strings.getLanguage() == 'en' && (
					<>
						<a
							onClick={() => {
								props.onCommand('french');
								gtmTrack('sec_btn_click', 'Language', 'French', '');
							}}
						>
							{strings.french}
						</a>
					</>
				)}
				{strings.getLanguage() == 'fr' && (
					<>
						<a
							onClick={() => {
								props.onCommand('english');
								gtmTrack('sec_btn_click', 'Language', 'English', '');
							}}
						>
							{strings.english}
						</a>
					</>
				)}
			</nav>
		</div>
	);
}

export default Nav;
