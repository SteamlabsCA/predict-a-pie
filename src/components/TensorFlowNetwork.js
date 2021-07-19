import './TensorFlowNetwork.scss';
import * as tf from '@tensorflow/tfjs';
import Spinner from './Spinner';
import TensorFlowConnections from './TensorFlowConnections';
import TensorFlowNeuron from './TensorFlowNeuron';
import React from 'react';

function TensorFlowNetwork({ src, inputs, outputs, ...props }) {
	const debug = false;

	const [loading, setLoading] = React.useState(true);
	const [model, setModel] = React.useState();
	const [layerModels, setLayerModels] = React.useState([]);
	const [layers, setLayers] = React.useState([]);

	const predict = async (model) => {
		if (model) {
			// Output debugging information
			if (debug) {
				console.log('%cStart Prediction', 'font-weight: bold; background: red; color: white');
			}

			const tensor = tf.tensor2d(
				inputs.map((input) => {
					return input.active ? 1 : 0;
				}),
				[1, inputs.length]
			);
			const output = await model.predict(tensor).array();

			// All inputs off
			const noInput = inputs.every((input) => {
				return !input.active;
			});

			// Output debugging information
			if (debug) {
				console.log('%cModel Weights', 'font-weight: bold; background: yellow');
				for (let i = 1; i < model.layers.length; i++) {
					console.log(`%cLayer ${i}`, 'background: cyan');
					let weights = model.layers[i].getWeights()[0].print();
				}

				console.log('%cInputs', 'font-weight: bold; background: yellow');
				tensor.print();
			}

			// Get intermediate outputs
			if (debug) {
				console.log('%cIntermediate Outputs', 'font-weight: bold; background: yellow');
			}
			for (let i = 1; i < layerModels.length - 1; i++) {
				const layerOutputs = await layerModels[i].predict(tensor).array();
				layers[i - 1] = layerOutputs[0].map((output) => {
					return {
						output: noInput ? 0 : output,
						ref: null,
					};
				});

				if (debug) {
					console.log(`%cDense Layer ${i}`, 'background: cyan');
					console.log(layerOutputs[0]);
				}
			}

			if (debug) {
				console.log('%cFinal Output', 'font-weight: bold; background: yellow');
				console.log(output[0]);
			}

			setLayers([...layers]);
			props.onPrediction(noInput ? [0, 0, 0, 0] : output[0]);
		}
	};

	React.useEffect(() => {
		const loadModel = async () => {
			const model = await tf.loadLayersModel(src);

			// Create additional models to view output at each layer
			layerModels.splice(0, layerModels.length);
			for (let i = 1; i < model.layers.length; i++) {
				if (model.layers[i].name.startsWith('dense')) {
					layerModels.push(
						tf.model({
							inputs: model.inputs,
							outputs: model.layers[i].output,
						})
					);
				}
			}

			setModel(model);
			setLayerModels(layerModels);
			setLoading(false);
		};
		setTimeout(loadModel, 1000);
	}, [src]);

	React.useEffect(() => {
		predict(model);
	}, [model, inputs]);

	return (
		<div className='TensorFlowNetwork'>
			<Spinner active={loading} />
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
