import './Reclassify.scss';
import React from 'react';

function Reclassify({recipe, visible, ...props}) {

  const [step, setStep] = React.useState('1');
  const [classification, setClassification] = React.useState('');

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
          <p>Do you agree with the classification?</p>
          <div className="Reclassify-buttons">
            <button onClick={onAgree}>Yes</button>
            <button onClick={onDisagree}>No</button>
          </div>
        </div>
        <div className="Reclassify-step Reclassify-step-2">
          <p>How would you classify it?</p>
          <div className="Reclassify-select">
            <select onChange={(event) => setClassification(event.target.value)}>
              <option value="Disgusting">Disgusting</option>
              <option value="Sweet">Sweet</option>
              <option value="Quiche">Quiche</option>
              <option value="Pizza">Pizza</option>
            </select>
            <button onClick={onReclassify}>Submit</button>
          </div>
        </div>
        <div className="Reclassify-step Reclassify-step-3">
          <strong>Thank You!</strong>
        </div>
      </div>)}
    </>
  );
}

export default Reclassify;
