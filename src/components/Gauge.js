import './Gauge.scss';
import background from '../assets/gauge.svg';
import needle from '../assets/needle.svg';
import React from 'react';

function Gauge({value}) {

  const [angle, setAngle] = React.useState(-90);

  React.useEffect(() => {
    setAngle(-90 + (180 * value));
  }, [value])

  return (
    <div className="Gauge">
      <div className="Gauge-container">
        <img className="Gauge-background" src={background} alt="Gauge background" />
        <img className="Gauge-needle" src={needle} style={{'transform': 'rotate(' + angle + 'deg)'}} alt="Gauge needle" />
      </div>
      <div className="Gauge-value">{Math.round(value * 100)}%</div>
    </div>
  );
}

export default Gauge;
