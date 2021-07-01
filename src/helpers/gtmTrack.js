function gtmTrack(event, category, name, value) {
	window.dataLayer.push({
		event: event,
		eventProps: {
			category: category,
			name: name,
			value: value,
		},
	});
}

export default gtmTrack;
