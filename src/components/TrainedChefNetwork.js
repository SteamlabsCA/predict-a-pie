import './TrainedChefNetwork.scss';
import Neuron from './Neuron';
import Tooltip from './Tooltip';
import TensorFlowNetwork from './TensorFlowNetwork';
import DropdownGroup from './DropdownGroup';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { useParams, useHistory } from 'react-router-dom';
import { strings } from './App';

function TrainedChefNetwork({ inputs, ...props }) {
	let { id } = useParams();
	const history = useHistory();
	let inputIngredients = false;

	try {
		inputIngredients = require(`../ingredients/${id}.json`);

		const [dropdownList, setDropdown] = React.useState(toArray(inputIngredients));
		const [dropdownVal, setDropdownVal] = React.useState({
			first: dropdownList.first[0],
			second: dropdownList.second[0][0] === undefined ? -1 : dropdownList.second[0][0],
		});
		const [inputLayer, setInputLayer] = React.useState(
			inputIngredients.Standard.ingredients.map((ingredient) => {
				return {
					id: uuid(),
					label: ingredient,
					type: 'input',
				};
			})
		);
		const [outputLayer, setOutputLayer] = React.useState(
			inputIngredients.Standard.classifications.map((classification) => {
				return {
					id: uuid(),
					label: classification,
					type: 'output',
					confidence: 0,
				};
			})
		);

		function toArray(obj) {
			let counter = 0;
			const first = Object.keys(obj);

			let temp2 = first[first.indexOf('Standard')];
			first[first.indexOf('Standard')] = first[0];
			first[0] = temp2;

			const second = [];

			for (let i = 0; i < first.length; i++) {
				if (typeof obj[first[i]] === 'object' && Object.keys(obj[first[i]]).length > 1 && !(first[i] === 'Standard')) {
					second.push(Object.keys(obj[first[i]]));
				} else {
					second.push(false);
					counter++;
				}
			}
			return {
				first: first,
				second: counter === second.length ? false : second,
			};
		}

		const onChange = (index) => {
			inputs[index] = inputs[index] === 0 ? 1 : 0;
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
			setOutputLayer([...outputLayer]);
		};

		const onSubmit = (value, primary) => {
			if (primary && (value === 'Standard' || !inputIngredients[value][dropdownVal.second])) {
				setInputLayer(
					inputIngredients[value][Object.keys(inputIngredients[value])[0]].map((ingredient) => {
						return {
							id: uuid(),
							label: ingredient,
							type: 'input',
						};
					})
				);
			} else {
				setDropdownVal(primary ? { ...dropdownVal, first: value } : { ...dropdownVal, second: value });
				setInputLayer(
					(primary ? inputIngredients[value][dropdownVal.second] : inputIngredients[dropdownVal.first][value]).map((ingredient) => {
						return {
							id: uuid(),
							label: ingredient,
							type: 'input',
						};
					})
				);
			}
		};

		React.useEffect(() => {
			for (let i = 0; i < inputLayer.length; i++) {
				inputLayer[i].active = inputs[i];
			}
			setInputLayer([...inputLayer]);
		}, [inputs]);

		return (
			<div className='TrainedChefNetwork'>
				{dropdownList.first.length > 0 && <DropdownGroup items={dropdownList} inputIngredients={inputIngredients} onSubmit={onSubmit} />}
				<div className='TrainedChefNetwork-layers'>
					<div className='Layer'>
						<div className='Layer-container'>
							<div className='Layer-neurons'>
								{inputLayer.map((neuron, index) => {
									if (strings[neuron.label].length > 18) {
										return <Tooltip text={strings[neuron.label]} key={neuron.id} neuron={neuron} onChange={() => onChange()} index={index} />;
									} else {
										return <Neuron key={neuron.id} neuron={neuron} onChange={() => onChange(index)} small />;
									}
								})}
							</div>
						</div>
					</div>
					<TensorFlowNetwork src='/models/wolfman/model.json' inputs={inputLayer} outputs={outputLayer} onPrediction={onPrediction} />
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
	} catch (ex) {
		if (ex instanceof Error) {
			history.push('/trained');
		} else throw ex;
		console.log(ex);
		return 0;
	}
}

export default TrainedChefNetwork;
