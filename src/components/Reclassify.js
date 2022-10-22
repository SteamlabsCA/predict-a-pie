import "./Reclassify.scss";
import React from "react";
import { strings } from "./App";
import gtmTrack from "../helpers/gtmTrack";

function Reclassify({
  recipe,
  classifications,
  visible,
  clickInstructionButton,
  ...props
}) {
  const [step, setStep] = React.useState("1");
  const [classification, setClassification] = React.useState(-1);

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setStep("1");
    }
    return () => {
      isMounted = false;
    };
  }, [visible]);

  const onAgree = (e) => {
    clickInstructionButton(e);
    gtmTrack("sec_btn_click", "Pretrained", "Classification: Agree", "Agree");
    setStep("1-3");
    dismiss();
  };

  const onDisagree = (e) => {
    clickInstructionButton(e);
    setClassification(0);
    gtmTrack(
      "sec_btn_click",
      "Pretrained",
      "Classification: Disagree",
      "Disagree"
    );
    setStep("1-2");
  };

  const onReclassify = () => {
    setStep("2-3");
    dismiss();
  };

  const dismiss = () => {
    setTimeout(() => {
      props.onReclassify(recipe, classification);
      setStep(1);
    }, 3000);
  };

  return (
    <>
      {visible && (
        <div className={"Reclassify Reclassify-" + step}>
          <div className="Reclassify-step Reclassify-step-1">
            <p>{strings.agree}</p>
            <div className="Reclassify-buttons">
              <button onClick={(e) => onAgree(e)} id="4-1">
                {strings.yes}
              </button>
              <button onClick={(e) => onDisagree(e)} id="4-2">
                {strings.no}
              </button>
            </div>
          </div>
          <div className="Reclassify-step Reclassify-step-2">
            <p>{strings.reclassify}</p>
            <div className="Reclassify-select">
              <select
                onChange={(event) => setClassification(event.target.value)}
              >
                {classifications.map((classification, index) => (
                  <option key={index} value={index}>
                    {strings[classification]}
                  </option>
                ))}
              </select>
              <button onClick={onReclassify}>{strings.submit}</button>
            </div>
          </div>
          <div className="Reclassify-step Reclassify-step-3">
            <strong>{strings.thankYou}</strong>
          </div>
        </div>
      )}
    </>
  );
}

export default Reclassify;
