import React, { useEffect } from "react";
import "./TrainedNetworkInstructionPopup.scss";

const TrainedNetworkInstructionPopup = ({ clickButton }) => {
  useEffect(() => {
    document
      .querySelectorAll(".Neuron-input")
      .forEach((elem) => elem.classList.add("zIndex"));
    document
      .querySelectorAll(".Neuron-output")
      .forEach((elem) => elem.classList.add("zIndex"));
  }, []);

  return (
    <div className="Popup">
      <div className="Popup-box Popup-1">
        <p>
          The Neural Network in this activity has been trained on thousands of
          recipes to be able to classify any recipe as "Sweet Pie", "Quiche",
          "Savoury Pie" and "Other" from a combination of the input ingredients.
          Now it can generalize and classify any of the millions of combinations
          of recipes.
        </p>
        <button id="1" onClick={(e) => clickButton(e)}>
          Next
        </button>
      </div>

      <div className="Popup-container Popup-2">
        {/* <div className="arrow arrow2"></div> */}
        <div className="Popup-box">
          <p>
            This activity can be done on your own, or with a group. For a group,
            start with "<strong>Create Classroom</strong>" from "
            <strong>FOR EDUCATOR</strong>" drop-down menu, and have everyone go
            to the URL that it generates.
          </p>
          <button id="2" onClick={(e) => clickButton(e)}>
            Next
          </button>
        </div>
      </div>

      <div className="Popup-container Popup-3">
        {/* <div className="arrow arrow3"></div> */}
        <div className="Popup-box">
          <p>
            Try different combinations of ingredients and see what the Neural
            Network thinks of them! You can also click on the "
            <strong>Find Recipe</strong>" button to search for a recipe.
          </p>
        </div>
      </div>

      <div className="Popup-container Popup-4">
        {/* <div className="arrow arrow4"></div> */}
        <div className="Popup-box">
          <p>
            You can agree or disagree with the AI’s prediction. If you have made
            a classroom link, your answer is recorded in the{" "}
            <strong>Classroom Stats</strong> page found in the top menu bar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainedNetworkInstructionPopup;
