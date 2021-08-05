import './SharePrompt.scss';
import React from 'react';
import { strings } from './App';

function SharePrompt({ buildNetwork, setLoading, loading, ...props }) {
	React.useEffect(() => {
		if (buildNetwork.visible) setLoading(false);
	});

	function bckpCopyText() {
		var textArea = document.createElement('textarea');
		textArea.value = buildNetwork.url;

		// Avoid scrolling to bottom
		textArea.style.top = '0';
		textArea.style.left = '0';
		textArea.style.position = 'fixed';

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		} catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		}
		document.body.removeChild(textArea);
	}

	function copyText() {
		props.onDismiss();
		if (!navigator.clipboard) {
			bckpCopyText();
			return;
		}
		navigator.clipboard.writeText(buildNetwork.url).then(
			function () {
				alert('Copied to clipboard!');
			},
			function (err) {
				console.error('Async: Could not copy text: ', err);
			}
		);
	}
	return (
		<>
			{buildNetwork.visible && (
				<div className='SharePrompt'>
					<div className='SharePrompt-modal'>
						<p className='SharePrompt-url'>{buildNetwork.url}</p>
						<button className='SharePrompt-copy' onClick={copyText}>
							{strings.copy}
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default SharePrompt;
