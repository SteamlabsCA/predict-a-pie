import './Reclassify.scss';
import React from 'react';
import { strings } from './App';

function Reclassify({recipe, classifications, visible, ...props}) {

  const [step, setStep] = React.useState('1');
  const [classification, setClassification] = React.useState(-1);

  React.useEffect(() => {
    setClassification(-1);
  }, [visible])

  const onAgree = () => {
    setStep('1-3');
    dismiss();
  };

  const onDisagree = () => {
    setStep('1-2');
  };

  const onReclassify = () => {
    setStep('2-3');
    dismiss();
  };

  const dismiss = () => {
    setTimeout(() => {
      props.onReclassify(recipe, classification);
      setStep(1);
    }, 3000);
  }

  return (
    <>
      {visible && (<div className={'Reclassify Reclassify-' + step}>
        <div className="Reclassify-step Reclassify-step-1">
          <p>{strings.agree}</p>
          <div className="Reclassify-buttons">
            <button onClick={onAgree}>{strings.yes}</button>
            <button onClick={onDisagree}>{strings.no}</button>
          </div>
        </div>
        <div className="Reclassify-step Reclassify-step-2">
          <p>{strings.reclassify}</p>
          <div className="Reclassify-select">
            <select onChange={(event) => setClassification(event.target.value)}>
              {classifications.map((classification, index) => (
                <option key={index} value={index}>{strings[classification]}</option>
              ))}
            </select>
            <button onClick={onReclassify}>{strings.submit}</button>
          </div>
        </div>
        <div className="Reclassify-step Reclassify-step-3">
          <strong>{strings.thankYou}</strong>
        </div>
      </div>)}
    </>
  );
}

export default Reclassify;
