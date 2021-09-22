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
								<h1>Classifiez différents types de tartes</h1>
								<h1>à l'aide d'un réseau neuronal</h1>
							</span>
							<div className='body'>
								<p>
								Qu'est-ce qui fait qu'un pâté est plus savoureux qu'un autre? Et si vous aviez tous les ingrédients du monde pour créer la tarte parfaite? Dans cet atelier, vous allez créer un réseau neuronal pour y parvenir! 
    							Vous utiliserez ensuite vos nouvelles connaissances pour tester un plus grand réseau neuronal qui a été créé à partir de l'apprentissage automatique dans le but d'analyser des milliers de recettes et trouver de nouvelles combinaisons originales.
								</p>
								<p>
									Vous souhaitez en savoir plus ? Visitez le{' '}
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
										site web de Steamlabs
									</a>{' '}
									pour :
								</p>
								<ul>
									<p>
										<li>En savoir plus sur cette activité et nos autres activités éducatives à propos de l'IA</li>
										<li>Accéder à des présentations éducatives pour cette activité</li>
										<li>Lire la Foire aux questions sur le fonctionnement de ce système d'IA et autres questions techniques sur la création de votre propre réseau</li>
									</p>
								</ul>
								<p>
									Nous aimerions recevoir vos questions ! Envoyez-nous un courriel à l'adresse info@steamlabs.ca et nous vous répondrons en ajoutant vos questions et vos réponses à la
									à la section FAQ de cette page.
								</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='Instructions-sctTwo'>
						Il y a deux activités principales que vous pouvez faire dans cette application web. Vous pouvez y accéder à tout moment à partir du menu qui se trouve dans le coin supérieur gauche
					</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Construire un réseau neuronal (RN)</h2>
							<p>
								Dans cette activité, vous pouvez construire un réseau neuronal réel et fonctionnel.
								Les <Definition text={strings.neuronDef}>neurones</Definition> de la première couche (celle de gauche) sont vos "entrées". Considérez-les comme les ingrédients, ou les éléments d'information sur lesquels votre RN fondera ses décisions. 
								La dernière couche (à droite) de <Definition text={strings.neuronDef}>neurones</Definition> représente les décisions, ou "classifications", que le réseau neuronal peut prendre sur la base de ces entrées.
								Ajoutez les <Definition text={strings.neuronDef}>neurones</Definition> un par un, connectez-les entre eux pour indiquer quelles entrées mènent à quelles décisions de sortie. Si vous devez détecter des combinaisons d'entrées, vous pouvez ajouter des "couches cachées" au milieu pour détecter ces combinaisons.
								Si nécessaire, vous pouvez cliquer sur le symbole (+) ou (-) de n'importe quel nœud et modifier les "poids" pour indiquer l'importance relative de chaque nœud entrant.
							</p>
						</div>
						<div>
							<h2>Tester un réseau neuronal pré-entraîné</h2>
							<p>
								Cette activité peut être réalisée seul ou en groupe. Pour un groupe, commencez par "Créer une salle de classe", et demandez à chacun d'aller sur l'URL générée.
							</p>
							<p>
								Le réseau neuronal de cette activité a été entraîné sur des milliers de recettes pour être capable de classifier n'importe quelle combinaison d'ingrédients comme étant une tarte "Sucrée", une "Quiche", une "Pizza", un "Pâté" ou quelque chose d'"Autre". Il peut maintenant généraliser et classifier n'importe quelle combinaison d'ingrédients disponibles.
							</p>
							<p>
								Essayez différentes combinaisons d'ingrédients et voyez ce que le réseau neuronal en pense ! Vous pouvez également cliquer sur le bouton "Trouver une recette" pour générer une nouvelle recette.
							</p>
							<p>
								Sauvegardez les recettes que vous aimez pour pouvoir les consulter ultérieurement. Vous pouvez signaler les classifications avec lesquelles vous n'êtes pas en accord et sélectionnez la classification correcte. Sur la page "Voir les statistiques de la classe", vous pouvez voir les classifications d'autres participants et vérifier s'ils sont d'accord avec vous.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remixer Predict a Pie</h2>
							<p>
								Lorsque vous remixez Predict a Pie, vous créez une copie du projet existant. A partir de là, vous pourrez personnaliser le projet et faire d'autres modifications.
							</p>
							<h3 style={{ marginBottom: 0 }}>Comment remixer</h3>
							<p style={{ marginTop: 0 }}>
								Pour remixer Predict a Pie, cliquez sur le logo de la plateforme Glitch (un poisson).
								<img
									src='https://cdn.glitch.com/1973df30-22e4-49d9-94b0-9a3b017066bc%2FGlitchLogo_Color.svg?v=1613667290307'
									width='50px'
									style={{ position: 'relative', top: '15px', margin: '0 15px' }}
								/>
								et cliquez sur <strong>'Remix on Glitch'</strong>.
							</p>
							<p> Pour vous approprier le projet, vous devrez le "booster" afin de disposer de suffisamment de mémoire et d'espace disque.</p>
							<h3>À partir de ce moment, vous pourrez :</h3>
							<ul style={{ marginBottom: '30px' }}>
								<p>
									<li>Modifier n'importe quel fichier du projet original.</li>
									<li>Changer le nom du projet.</li>
									<li>Personnaliser le projet pour qu'il vous ressemble !</li>
								</p>
							</ul>
						</>
					)}
					<h2>À propos de cette application</h2>
					<h3>Crédits</h3>
					<div className='Instructions-sctFour'>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')}
								href='https://www.steamlabs.ca/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie est une création de Steamlabs.
						</p>

						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://kidscodejeunesse.org/', 'https://kidscodejeunesse.org/')}
								href='https://kidscodejeunesse.org/'
								target='_new'
							>
								<img src='https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png' height='100px' />
							</a>
							Co-conçu par Steamlabs et Kids Code Jeunesse.
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
							Créé avec le financement d'Amazon Future Engineer.
						</p>
					</div>
					<div className='Instructions-sctFive'>
						<h3>License</h3>
						<p>Sous licence Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
						<p>En résumé, vous êtes libre de :</p>
						<ul>
							<p>
								<li>partager - copier et redistribuer le matériel sur tout support ou format</li>
								<li>Adapter - remixer, transformer et développer le matériel à toutes fins, même commerciales.</li>
							</p>
						</ul>
						<p>Sous les conditions suivantes :</p>
						<ul>
							<p>
								<li>
									Attribution - Vous devez donner le crédit approprié, fournir un lien vers la licence et indiquer si des modifications ont été apportées. Vous pouvez le faire de toute manière raisonnable, mais pas d'une manière qui suggère que le donneur de licence vous approuve ou approuve votre utilisation.
								</li>
								<li>
									ShareAlike - Si vous remixez, transformez ou développez le matériel, vous devez distribuer vos contributions sous la même licence que l'original.
								</li>
							</p>
						</ul>
						<p>
							Les détails complets de cette licence peuvent être trouvés ici :{' '}
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
								Politique de confidentialité
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
								classification. On the "View Stats" page you can see if others agreed with you.
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
