import React from 'react';
import './NavBar.scss';
import Nav from './Nav';

function NavBar({ title, content, appData, checkEnv, envVariables, ...props }) {
	const isMountedRef = React.useRef(null);

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
			<h1>{title}</h1>
			{envVariables && content}
		</header>
	);
}

export default NavBar;
