import './TensorFlowNetwork.scss';
import * as tf from '@tensorflow/tfjs';
import React from 'react';

function TensorFlowNetwork({src, inputs, ...props}) {

  const [model, setModel] = React.useState()
  const [layerModels, setLayerModels] = React.useState([])
  const [layerOutputs, setLayerOutputs] = React.useState([]);

  const predict = async (model) => {
    if (model) {
      const tensor = tf.tensor2d(inputs.map(input => {
        return input.active ? 1 : 0;
      }), [1, 19]);
      const output = await model.predict(tensor).array();

      // Get intermediate outputs
      for (let i = 0; i < layerModels.length; i++) {
        layerOutputs[i] = await layerModels[i].predict(tensor).array();
        console.log(`Layer ${i}`);
        console.log(layerOutputs[i]);
      }

      setLayerOutputs([...layerOutputs]);
      props.onPrediction(output[0]);
    }
  };

  React.useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel(src);

      // Create additional models to view output at each layer
      layerModels.splice(0, layerModels.length);
      for (let i = 0; i < model.layers.length; i++) {
        layerModels.push(tf.model({
          inputs: model.inputs,
          outputs: model.layers[i].output
        }));
      }

      setModel(model);
      setLayerModels(layerModels);
    };
    loadModel();
  }, [src]);

  React.useEffect(() => {
    predict(model);
  }, [model, inputs]);

  return (
    <div className="TensorFlowNetwork">
    </div>
  );
}

export default TensorFlowNetwork;
