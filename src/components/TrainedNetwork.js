import './TrainedNetwork.scss';
import Neuron from './Neuron';
import TensorFlowNetwork from './TensorFlowNetwork';
import React from 'react';
import { v4 as uuid } from 'uuid';

function TrainedNetwork({ inputs, ingredients, classifications, ...props }) {
	const [inputLayer, setInputLayer] = React.useState(
		ingredients.map((ingredient) => {
			return {
				id: uuid(),
				label: ingredient,
				type: 'input',
			};
		})
	);
	const [outputLayer, setOutputLayer] = React.useState(
		classifications.map((classification) => {
			return {
				id: uuid(),
				label: classification,
				type: 'output',
				confidence: 0,
			};
		})
	);

	React.useEffect(() => {
		props.getRecipe('predictApie');
	}, []);

	const onChange = (index) => {
		let outputs = [...outputLayer];
		var isAllZero = true;
		inputs[index] = inputs[index] === 0 ? 1 : 0;

		for (let i = 0; i < inputs.length; ++i) {
			if (inputs[i] !== 0) {
				isAllZero = false;
				break;
			}
		}

		if (isAllZero) {
			for (let i = 0; i < outputs.length; ++i) {
				outputs[i]['active'] = false;
				outputs[i]['confidence'] = 0;
			}
		}

		setInputLayer([...inputLayer]);
		props.onChange(inputs);
	};

	const onPrediction = (result) => {
		const max = Math.max(...result);
		result.map((output, index) => {
			outputLayer[index].confidence = Math.round(output * 100);
			outputLayer[index].active = output > 0 && output === max;
			if (outputLayer[index].active) {
				props.onPrediction(index);
			}
		});
		if (inputLayer[0].active && inputLayer.filter((x) => x.active).length === 1) {
			let modOutput = [...outputLayer];
			modOutput[0] = {
				...modOutput[0],
				active: false,
				confidence: 0,
			};
			modOutput[4] = {
				...modOutput[4],
				active: true,
				confidence: 100,
			};
			setOutputLayer([...modOutput]);
		} else {
			setOutputLayer([...outputLayer]);
		}
	};

	React.useEffect(() => {
		for (let i = 0; i < inputLayer.length; i++) {
			inputLayer[i].active = inputs[i];
		}
		setInputLayer([...inputLayer]);
	}, [inputs]);

	return (
		<div className='TrainedNetwork'>
			<div className='TrainedNetwork-layers'>
				<div className='Layer'>
					<div className='Layer-container'>
						<div className='Layer-neurons'>
							{inputLayer.map((neuron, index) => (
								<Neuron key={neuron.id} neuron={neuron} onChange={() => onChange(index)} small />
							))}
						</div>
					</div>
				</div>
				<TensorFlowNetwork src='/models/predictApie/model.json' inputs={inputLayer} outputs={outputLayer} onPrediction={onPrediction} />
				<div className='Layer'>
					<div className='Layer-container'>
						<div className='Layer-neurons'>
							{outputLayer.map((neuron) => (
								<Neuron key={neuron.id} neuron={neuron} small />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrainedNetwork;
