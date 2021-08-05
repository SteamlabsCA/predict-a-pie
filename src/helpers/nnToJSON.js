const nnToJSON = (network, connections) => {
	const replacer = (key, value) => {
		if (key == 'ref') return undefined;
		if (key == 'meter') return undefined;
		return value;
	};
	return JSON.stringify(
		{
			network: network,
			connections: connections,
		},
		replacer
	);
};

export default nnToJSON;
