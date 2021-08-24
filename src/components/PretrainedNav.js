import './PretrainedNav.scss';
import React from 'react';
import pretrainedModels from '../pretrainedModels.json';
import gtmTrack from '../helpers/gtmTrack';
import { Link } from 'react-router-dom';
import { strings } from './App';

function PretrainedNav({ appData, mainOpen }) {
	let models = pretrainedModels.Models;

	const [open, setOpen] = React.useState(false);
	const [menuStyle, setMenuStyle] = React.useState();

	React.useEffect(() => {
		if (!mainOpen) setOpen(false);
	}, [mainOpen]);

	return (
		<div className='PretrainedNav'>
			<div
				className='PretrainedNav-open stayOpen'
				onClick={(event) => {
					setOpen(!open);
					setMenuStyle({
						left: event.clientX + 10 + 'px',
						top: event.clientY - 5 + 'px',
					});
				}}
			>
				{strings.pretrainedModel}
			</div>
			<div className={open ? 'PretrainedNav-menu open' : 'PretrainedNav-menu closed'} style={menuStyle}>
				{open &&
					Object.entries(models).map(([key, value]) => {
						return (
							<Link
								key={key}
								onClick={() => gtmTrack('prm_btn_click', 'Pretrained', key, '')}
								to={appData.classroom ? `/${appData.classroom.code + value}` : value}
							>
								{key}
							</Link>
						);
					})}
			</div>
		</div>
	);
}

export default PretrainedNav;
