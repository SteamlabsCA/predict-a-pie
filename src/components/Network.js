import './Network.scss';
import Connections from './Connections';
import Definition from './Definition';
import Layer from './Layer';
import Weights from './Weights';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { strings } from './App';
import gtmTrack from '../helpers/gtmTrack';
import Spinner from './Spinner';
import { useHistory } from 'react-router-dom';

function Network({ shareNetwork, buildNetwork, shared, retrieveNetwork, retrievedNetwork, setRetrievedNetwork, ...props }) {
	const [network, setNetwork] = React.useState(
		buildNetwork.network
			? buildNetwork.network
			: [
					{
						id: uuid(),
						type: 'input',
						label: strings.inputLayer,
						neurons: [
							{
								id: uuid(),
								type: 'input',
								label: strings.neuron,
							},
						],
					},
					{
						id: uuid(),
						type: 'output',
						label: strings.outputLayer,
						neurons: [
							{
								id: uuid(),
								type: 'output',
								label: strings.neuron,
							},
						],
					},
			  ]
	);
	const [connections, setConnections] = React.useState([]);
	const [dragging, setDragging] = React.useState(false);
	const [mouseX, setMouseX] = React.useState();
	const [mouseY, setMouseY] = React.useState();
	const [loading, setLoading] = React.useState(true);

	const isMountedRef = React.useRef(null);
	const history = useHistory();

	React.useEffect(() => {
		isMountedRef.current = true;
		if (retrievedNetwork && retrievedNetwork.connections && isMountedRef.current) {
			setConnections(retrievedNetwork.connections);
			setRetrievedNetwork({
				network: false,
				connections: false,
			});
			setLoading(false);
		}
		return () => (isMountedRef.current = false);
	}, [network]);

	React.useEffect(() => {
		isMountedRef.current = true;
		//If theres a shared NN set it up otherwise redirect to build page
		if (retrievedNetwork && retrievedNetwork.network && isMountedRef.current) {
			setNetwork(retrievedNetwork.network);
		} else if (shared && !retrievedNetwork) {
			history.push('/build');
			alert('Invalid Neural Network Code');
			shared = false;
		}
		return () => (isMountedRef.current = false);
	}, [retrievedNetwork]);

	React.useEffect(() => {
		isMountedRef.current = true;
		if (isMountedRef.current) {
			window.addEventListener('mouseup', onMouseUp);
			if (buildNetwork.connections) setConnections(buildNetwork.connections);
			if (shared) retrieveNetwork(window.location.pathname.slice(7));
		}
		return () => (isMountedRef.current = false);
	}, []);

	React.useEffect(() => {
		onChange();
	}, [connections]);

	React.useEffect(() => {
		isMountedRef.current = true;
		if (isMountedRef.current) {
			shareNetwork(false, network, connections);
		}
		return () => (isMountedRef.current = false);
	}, [network, connections]);

	const isNeuronAdjacent = (n1, n2) => {
		for (let i = 0; i < network.length - 1; i++) {
			if (network[i].neurons.find((neuron) => neuron.id === n1.id)) {
				return network[i + 1].neurons.find((neuron) => neuron.id === n2.id);
			}
		}
	};

	const neuronInputs = (neuron) => {
		let inputs = [];
		for (let i = 0; i < connections.length; i++) {
			if (connections[i].to.id === neuron.id) {
				inputs.push(connections[i]);
			}
		}
		return inputs;
	};

	const onAddLayer = () => {
		gtmTrack('ter_btn_click', 'Build', 'Layer: Add', 'Add');
		// Break existing connections
		const outputNeuronIds = network[network.length - 1].neurons.map((neuron) => neuron.id);
		let newConnections = [...connections];
		newConnections = newConnections.filter((connection) => {
			return !outputNeuronIds.includes(connection.to.id);
		});
		setConnections(newConnections);

		// Add new layer
		network.splice(network.length - 1, 0, {
			id: uuid(),
			label: strings.hiddenLayer,
			type: 'hidden',
			neurons: [
				{
					id: uuid(),
					label: 'Neuron',
				},
			],
		});
		onChange();
	};

	const onStartConnection = (neuron) => {
		setConnections([
			...connections,
			{
				from: neuron,
				to: false,
				positive: true,
				weight: 0,
				editing: false,
			},
		]);
		setDragging(true);
	};

	const onCompleteConnection = (neuron, positive) => {
		if (dragging) {
			let newConnections = [...connections];
			let connection = newConnections.pop();
			if (isNeuronAdjacent(connection.from, neuron)) {
				connection.to = neuron;
				connection.positive = positive;

				// Remove any existing connections
				newConnections = newConnections.filter((item) => {
					return !(item.from.id === connection.from.id && item.to.id === neuron.id);
				});

				newConnections.push(connection);
			}

			// Assign default weights to inputs
			const inputs = newConnections.filter((connection) => {
				return connection.to.id === neuron.id && connection.positive === positive;
			});
			inputs.map((connection) => {
				if (positive) {
					connection.weight = Math.round(100 / inputs.length);
				} else {
					connection.weight = 100;
				}
			});

			setConnections(newConnections);
			setDragging(false);
		}
	};

	const onAdjustWeights = (neuron, positive) => {
		connections.map((connection) => {
			if (connection.to.id === neuron.id && connection.positive === positive) {
				connection.editing = true;
			} else {
				connection.editing = false;
			}
		});
		setConnections([...connections]);
	};

	const onAdjustWeightsComplete = () => {
		connections.map((connection) => (connection.editing = false));
		setConnections([...connections]);
	};

	const onChangeWeight = (connection, value) => {
		connection.weight = value;
		setConnections([...connections]);
	};

	const onDeleteConnection = (connection) => {
		// Remove connection
		let newConnections = connections.filter((item) => {
			return !(item.from.id === connection.from.id && item.to.id === connection.to.id);
		});

		// Assign default weights to sibling inputs
		if (connection.positive) {
			const inputs = newConnections.filter((item) => {
				return item.to.id === connection.to.id && connection.positive;
			});
			inputs.map((connection) => {
				connection.weight = Math.round(100 / inputs.length);
			});
		}

		setConnections(newConnections);
	};

	const onDeleteNeuron = (neuron) => {
		gtmTrack('ter_btn_click', 'Build', 'Neuron: Delete', 'Delete');
		let newConnections = connections.filter((connection) => {
			return connection.from.id !== neuron.id && connection.to.id !== neuron.id;
		});
		setConnections(newConnections);
	};

	const onDeleteLayer = (layer) => {
		gtmTrack('ter_btn_click', 'Build', 'Layer: Delete', 'Delete');
		let newNetwork = network.filter((item) => {
			return item.id != layer.id;
		});
		setNetwork(newNetwork);
	};

	const onChange = () => {
		for (let i = 1; i < network.length; i++) {
			for (let j = 0; j < network[i].neurons.length; j++) {
				// Activation function
				let activation = 0;
				const inputs = neuronInputs(network[i].neurons[j]);
				for (let k = 0; k < inputs.length; k++) {
					if (inputs[k].from.active) {
						activation += inputs[k].positive ? inputs[k].weight : -inputs[k].weight;
					}
				}
				network[i].neurons[j].active = activation >= 99;
			}
		}
		setNetwork([...network]);
	};

	const onMouseMove = (event) => {
		setMouseX(event.clientX);
		setMouseY(event.clientY);
		if (dragging && event.buttons === 0) {
			setConnections(connections.slice(0, -1));
			setDragging(false);
		}
	};

	const onMouseUp = () => {
		if (dragging) {
			setConnections(connections.slice(0, -1));
			setDragging(false);
		}
	};

	return (
		<>
			<div className={connections.length === 0 && network.length < 3 ? 'Network Network-empty' : 'Network'} onMouseMove={onMouseMove}>
				<div className='Network-container'>
					<div className='Network-layers'>
						{network.map((layer) => (
							<Layer
								key={layer.id}
								layer={layer}
								onStartConnection={onStartConnection}
								onCompleteConnection={onCompleteConnection}
								onDeleteNeuron={onDeleteNeuron}
								onDeleteLayer={onDeleteLayer}
								onChange={onChange}
								onAdjustWeights={onAdjustWeights}
							/>
						))}
						<div className='Network-instruction'>
							{retrievedNetwork && props.envVariables ? <Spinner active={loading} /> : <p>{strings.connectionInstructions}</p>}
						</div>
					</div>
					<div className='Network-instructions'>
						<div className='Network-instruction'>
							<p>{strings.inputLayerInstructions}</p>
						</div>
						<div className='Network-instruction'>
							<p>{strings.hiddenLayerInstructions}</p>
							<button className='Network-button' onClick={onAddLayer}>
								{strings.addLayer}
							</button>
						</div>
						<div className='Network-instruction'>
							<p>{strings.outputLayerInstructions}</p>
						</div>
					</div>
				</div>
			</div>
			<Connections connections={connections} mouseX={mouseX} mouseY={mouseY} onDeleteConnection={onDeleteConnection} />
			<Weights connections={connections} onChange={onChangeWeight} onComplete={onAdjustWeightsComplete} />
		</>
	);
}

export default Network;
