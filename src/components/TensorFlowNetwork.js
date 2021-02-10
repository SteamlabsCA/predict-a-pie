import './TensorFlowNetwork.scss';
import * as tf from '@tensorflow/tfjs';
import TensorFlowConnections from './TensorFlowConnections';
import TensorFlowNeuron from './TensorFlowNeuron';
import React from 'react';

function TensorFlowNetwork({src, inputs, outputs, ...props}) {

  const [model, setModel] = React.useState()
  const [layerModels, setLayerModels] = React.useState([])
  const [layers, setLayers] = React.useState([]);

  const predict = async (model) => {
    if (model) {
      const tensor = tf.tensor2d(inputs.map(input => {
        return input.active ? 1 : 0;
      }), [1, 19]);
      const output = await model.predict(tensor).array();

      // Get intermediate outputs
      for (let i = 1; i < layerModels.length - 1; i++) {
        const layerWeights = await layerModels[i].predict(tensor).array();
        layers[i-1] = layerWeights[0].map(weight => {
          return {
            'weight': weight,
            'ref': null
          };
        });
        console.log(`Layer ${i}`);
        console.log(layerWeights[0]);
      }

      setLayers([...layers]);
      props.onPrediction(output[0]);
    }
  };

  React.useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel(src);
      console.log(model);

      // Create additional models to view output at each layer
      layerModels.splice(0, layerModels.length);
      for (let i = 0; i < model.layers.length; i++) {
        if (model.layers[i].constructor.name === 'Dense') {
          layerModels.push(tf.model({
            inputs: model.inputs,
            outputs: model.layers[i].output
          }));
        }
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
      {layers.map((layer, i) => (
        <div key={i}>
          {layer.map((neuron, j) => (
            <TensorFlowNeuron key={j} neuron={neuron} />
          ))}
        </div>
      ))}
      <TensorFlowConnections inputs={inputs} layers={layers} outputs={outputs} />
    </div>
  );
}

export default TensorFlowNetwork;
