import './TensorFlowNetwork.scss';
import * as tf from '@tensorflow/tfjs';
import React from 'react';

function TensorFlowNetwork({src}) {

  React.useEffect(() => {
    const loadModel = async () => {
      const model = await tf.loadLayersModel(src);
    };
    loadModel();
  }, [src]);

  return (
    <div className="TensorFlowNetwork">
    </div>
  );
}

export default TensorFlowNetwork;
