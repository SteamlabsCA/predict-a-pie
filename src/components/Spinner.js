import './Spinner.scss';
import React from 'react';

function Spinner({active}) {

  return (
    <>
      {active && (
        <div class="Spinner"></div>
      )}
    </>
  );
}

export default Spinner;
