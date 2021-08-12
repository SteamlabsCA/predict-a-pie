import React from 'react';
import './NavBar.scss';
import Nav from './Nav';
import { useParams } from 'react-router-dom';

function NavBar({ title, content, appData, checkEnv, envVariables, ...props }) {
	const isMountedRef = React.useRef(null);
	let { id } = useParams();

	React.useEffect(() => {
		isMountedRef.current = true;
		if (isMountedRef.current && checkEnv) {
			checkEnv();
		}
		return () => (isMountedRef.current = false);
	}, []);

	return (
		<header className='NavBar'>
			<Nav appData={appData} route={props.route} onCommand={props.onCommand} />
			<h1>{title === 'customPretrain' ? `Test Chef ${id.charAt(0).toUpperCase() + id.slice(1)}'s Pretrained Network` : title}</h1>
			{envVariables && content}
		</header>
	);
}

export default NavBar;
