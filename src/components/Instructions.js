import './Instructions.scss';
import Definition from './Definition';
import React from 'react';
import { strings } from './App';
import gtmTrack from '../helpers/gtmTrack';

function Instructions() {
	if (strings.getLanguage() == 'fr') {
		return (
			<div className='Instructions'>
				<div className='Instructions-container'>
					<div className='Instructions-sctOne'>
						<span>
							<span className='Instructions-title'>
								<h1>Predict a Pie </h1>
								<h1>with a Neural Network</h1>
							</span>
							<div className='body'>
								<p>
									What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop,
									you will wire up a neural network to do just that! You will then use your new knowledge to test a larger neural network that has
									used "machine learning" to analyse thousands of recipes to come up with new, creative combinations.
								</p>
								<p>
									Interested in learning more? Visit the{' '}
									<a
										onClick={() =>
											gtmTrack(
												'out_btn_click',
												'Instructions',
												'Out Bound: https://steamlabs.ca/ai-programs/predict-a-pie',
												'https://steamlabs.ca/ai-programs/predict-a-pie'
											)
										}
										href='https://steamlabs.ca'
										target='_new'
									>
										Steamlabs website
									</a>{' '}
									to:
								</p>
								<ul>
									<p>
										<li>Read more about this activity and our other AI educational activities</li>
										<li>Find links to educational presentations for this activity</li>
										<li>Frequently Asked Questions on how this AI system works and technical questions on building your own network</li>
									</p>
								</ul>
								<p>
									We’d love to hear your questions! Email us at info@steamlabs.ca and we will get back to you and add your questions and answers to
									the page’s FAQ.
								</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='Instructions-sctTwo'>
						There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left
						corner
					</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Build a Neural Network (NN)</h2>
							<p>
								In this activity, you can build a real, working Neural Network. The <Definition text={strings.neuronDef}>neuron</Definition> nodes in
								the first layer on the left are your "inputs". Think of these as the ingredients, or pieces of information that your NN will base its
								decisions on. The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the decisions, or "classifications" that
								the neural network can make based on these inputs. Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time,
								connect them together to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add
								"hidden layers" in the middle to detect these combinations. If necessary, you can click on the (+) or (-) symbol on any node and
								change the "weights" to indicate the relative importance of each incoming node.
							</p>
						</div>
						<div>
							<h2>Test a Trained Neural Network</h2>
							<p>
								This activity can be done on your own, or with a group. For a group, start with "Create Classroom", and have everyone go to the URL
								that it generates.
							</p>
							<p>
								The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as "Sweet Pie",
								"Quiche", "Savoury Pie" and "Disgusting" from a combination of the input ingredients. Now it can generalize and classify any of the
								millions of combinations of recipes.
							</p>
							<p>
								Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the "Find Recipe"
								button to search for a recipe.
							</p>
							<p>
								Save the recipes that you like for future reference. Find classifications that you disagree with, and input the correct
								classification. On the "View Classroom Stats" page you can see if others agreed with you.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remixing Predict a Pie</h2>
							<p>
								When you remix Predict a Pie, you’re creating a copy of the existing project. From there, you can customize the project and make other
								changes.
							</p>
							<h3 style={{ marginBottom: 0 }}>How to Remix</h3>
							<p style={{ marginTop: 0 }}>
								To remix Predict a Pie press on the fish icon
								<img
									src='https://cdn.glitch.com/1973df30-22e4-49d9-94b0-9a3b017066bc%2FGlitchLogo_Color.svg?v=1613667290307'
									width='50px'
									style={{ position: 'relative', top: '15px', margin: '0 15px' }}
								/>
								and click on <strong>'Remix on Glitch'</strong>.
							</p>
							<p> To make the project your own you'll have to boost it to allow for extra memory and disk space.</p>
							<h3>From here, you can:</h3>
							<ul style={{ marginBottom: '30px' }}>
								<p>
									<li>Edit any of the files that were in the original project.</li>
									<li>Change the name of the project.</li>
									<li>Customize the project to make it your own!</li>
								</p>
							</ul>
						</>
					)}
					<h2>About this app</h2>
					<h3>Credits</h3>
					<div className='Instructions-sctFour'>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')}
								href='https://www.steamlabs.ca/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie is a creation of Steamlabs.
						</p>

						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://kidscodejeunesse.org/', 'https://kidscodejeunesse.org/')}
								href='https://kidscodejeunesse.org/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png' height='100px' />
							</a>
							Co-designed by Steamlabs and Kids Code Jeunesse.
						</p>
						<p>
							<a
								onClick={() =>
									gtmTrack(
										'out_btn_click',
										'Instructions',
										'Out Bound: https://www.amazonfutureengineer.com/',
										'https://www.amazonfutureengineer.com/'
									)
								}
								href='https://www.amazonfutureengineer.com/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png' />
							</a>
							Created with funding from Amazon Future Engineer.
						</p>
					</div>
					<div className='Instructions-sctFive'>
						<h3>License</h3>
						<p>Licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
						<p>In summary, you are free to:</p>
						<ul>
							<p>
								<li>Share — copy and redistribute the material in any medium or format</li>
								<li>Adapt — remix, transform, and build upon the material for any purpose, even commercially.</li>
							</p>
						</ul>
						<p>Under the following terms:</p>
						<ul>
							<p>
								<li>
									Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in
									any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
								</li>
								<li>
									ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as
									the original.
								</li>
							</p>
						</ul>
						<p>
							Full details of this license can be found here:{' '}
							<a
								onClick={() =>
									gtmTrack(
										'out_btn_click',
										'Instructions',
										'Out Bound: https://creativecommons.org/licenses/by-sa/4.0/',
										'https://creativecommons.org/licenses/by-sa/4.0/'
									)
								}
								href='https://creativecommons.org/licenses/by-sa/4.0/'
								target='_new'
							>
								https://creativecommons.org/licenses/by-sa/4.0/
							</a>
						</p>
					</div>
					<div className='Instructions-sctSix'>
						<h3>
							<a href='./PredictAPiePrivacyPolicy.pdf' target='blank'>
								Privacy Policy
							</a>
						</h3>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className='Instructions'>
				<div className='Instructions-container'>
					<div className='Instructions-sctOne'>
						<span>
							<span className='Instructions-title'>
								<h1>Predict a Pie </h1>
								<h1>with a Neural Network</h1>
							</span>
							<div className='body'>
								<p>
									What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop,
									you will wire up a neural network to do just that! You will then use your new knowledge to test a larger neural network that has
									used "machine learning" to analyse thousands of recipes to come up with new, creative combinations.
								</p>
								<p>
									Interested in learning more? Visit the{' '}
									<a
										onClick={() =>
											gtmTrack(
												'out_btn_click',
												'Instructions',
												'Out Bound: https://steamlabs.ca/ai-programs/predict-a-pie',
												'https://steamlabs.ca/ai-programs/predict-a-pie'
											)
										}
										href='https://steamlabs.ca'
										target='_new'
									>
										Steamlabs website
									</a>{' '}
									to:
								</p>
								<ul>
									<p>
										<li>Read more about this activity and our other AI educational activities</li>
										<li>Find links to educational presentations for this activity</li>
										<li>Frequently Asked Questions on how this AI system works and technical questions on building your own network</li>
									</p>
								</ul>
								<p>
									We’d love to hear your questions! Email us at info@steamlabs.ca and we will get back to you and add your questions and answers to
									the page’s FAQ.
								</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='Instructions-sctTwo'>
						There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left
						corner
					</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Build a Neural Network (NN)</h2>
							<p>
								In this activity, you can build a real, working Neural Network. The <Definition text={strings.neuronDef}>neuron</Definition> nodes in
								the first layer on the left are your "inputs". Think of these as the ingredients, or pieces of information that your NN will base its
								decisions on. The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the decisions, or "classifications" that
								the neural network can make based on these inputs. Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time,
								connect them together to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add
								"hidden layers" in the middle to detect these combinations. If necessary, you can click on the (+) or (-) symbol on any node and
								change the "weights" to indicate the relative importance of each incoming node.
							</p>
						</div>
						<div>
							<h2>Test a Trained Neural Network</h2>
							<p>
								This activity can be done on your own, or with a group. For a group, start with "Create Classroom", and have everyone go to the URL
								that it generates.
							</p>
							<p>
								The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as "Sweet Pie",
								"Quiche", "Savoury Pie" and "Disgusting" from a combination of the input ingredients. Now it can generalize and classify any of the
								millions of combinations of recipes.
							</p>
							<p>
								Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the "Find Recipe"
								button to search for a recipe.
							</p>
							<p>
								Save the recipes that you like for future reference. Find classifications that you disagree with, and input the correct
								classification. On the "View Classroom Stats" page you can see if others agreed with you.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remixing Predict a Pie</h2>
							<p>
								When you remix Predict a Pie, you’re creating a copy of the existing project. From there, you can customize the project and make other
								changes.
							</p>
							<h3 style={{ marginBottom: 0 }}>How to Remix</h3>
							<p style={{ marginTop: 0 }}>
								To remix Predict a Pie press on the fish icon
								<img
									src='https://cdn.glitch.com/1973df30-22e4-49d9-94b0-9a3b017066bc%2FGlitchLogo_Color.svg?v=1613667290307'
									width='50px'
									style={{ position: 'relative', top: '15px', margin: '0 15px' }}
								/>
								and click on <strong>'Remix on Glitch'</strong>.
							</p>
							<p> To make the project your own you'll have to boost it to allow for extra memory and disk space.</p>
							<h3>From here, you can:</h3>
							<ul style={{ marginBottom: '30px' }}>
								<p>
									<li>Edit any of the files that were in the original project.</li>
									<li>Change the name of the project.</li>
									<li>Customize the project to make it your own!</li>
								</p>
							</ul>
						</>
					)}
					<h2>About this app</h2>
					<h3>Credits</h3>
					<div className='Instructions-sctFour'>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')}
								href='https://www.steamlabs.ca/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie is a creation of Steamlabs.
						</p>

						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://kidscodejeunesse.org/', 'https://kidscodejeunesse.org/')}
								href='https://kidscodejeunesse.org/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png' height='100px' />
							</a>
							Co-designed by Steamlabs and Kids Code Jeunesse.
						</p>
						<p>
							<a
								onClick={() =>
									gtmTrack(
										'out_btn_click',
										'Instructions',
										'Out Bound: https://www.amazonfutureengineer.com/',
										'https://www.amazonfutureengineer.com/'
									)
								}
								href='https://www.amazonfutureengineer.com/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png' />
							</a>
							Created with funding from Amazon Future Engineer.
						</p>
					</div>
					<div className='Instructions-sctFive'>
						<h3>License</h3>
						<p>Licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
						<p>In summary, you are free to:</p>
						<ul>
							<p>
								<li>Share — copy and redistribute the material in any medium or format</li>
								<li>Adapt — remix, transform, and build upon the material for any purpose, even commercially.</li>
							</p>
						</ul>
						<p>Under the following terms:</p>
						<ul>
							<p>
								<li>
									Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in
									any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
								</li>
								<li>
									ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as
									the original.
								</li>
							</p>
						</ul>
						<p>
							Full details of this license can be found here:{' '}
							<a
								onClick={() =>
									gtmTrack(
										'out_btn_click',
										'Instructions',
										'Out Bound: https://creativecommons.org/licenses/by-sa/4.0/',
										'https://creativecommons.org/licenses/by-sa/4.0/'
									)
								}
								href='https://creativecommons.org/licenses/by-sa/4.0/'
								target='_new'
							>
								https://creativecommons.org/licenses/by-sa/4.0/
							</a>
						</p>
					</div>
					<div className='Instructions-sctSix'>
						<h3>
							<a href='./PredictAPiePrivacyPolicy.pdf' target='blank'>
								Privacy Policy
							</a>
						</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default Instructions;
