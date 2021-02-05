import './TensorFlowNetwork.scss';
import * as tf from '@tensorflow/tfjs';
import React from 'react';

function TensorFlowNetwork({src, inputs, ...props}) {

  const [model, setModel] = React.useState()

  const predict = async () => {
    if (model) {
      const tensor = tf.tensor2d(inputs.map(input => {
        return input.active ? 1 : 0;
      }), [1, 19]);
      const output = await model.predict(tensor).array();
      props.onPrediction(output[0]);
    }
  };

  React.useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel(src);
      setModel(model);
      predict();
    };
    loadModel();
  }, [src]);

  React.useEffect(() => {
    predict();
  }, [inputs]);

  return (
    <div className="TensorFlowNetwork">
    </div>
  );
}

export default TensorFlowNetwork;
