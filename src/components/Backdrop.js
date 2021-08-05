import './Backdrop.scss';
import React from 'react';
import Spinner from './Spinner';

function Backdrop({ loading }) {
	return (
		<>
			{loading && (
				<div className='Backdrop'>
					<span className='spinner-container'>
						<Spinner active={true} />
					</span>
				</div>
			)}
		</>
	);
}

export default Backdrop;
