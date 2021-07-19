import './Spinner.scss';
import React from 'react';

function Spinner({ active, type }) {
	return <>{active && <div className={'Spinner'}></div>}</>;
}

export default Spinner;
