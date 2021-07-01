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
					<h1>Classifiez différents types de tartes à l'aide d'un réseau neuronal</h1>
					<p>
						Qu'est-ce qui fait qu'un pâté est plus savoureux qu'un autre? Et si vous aviez tous les ingrédients du monde pour créer la tarte parfaite? Dans cet atelier, vous allez créer un réseau
						neuronal pour y parvenir! Vous utiliserez ensuite vos nouvelles connaissances pour tester un plus grand réseau neuronal qui a été créé à partir de l'apprentissage automatique dans le but
						d'analyser des milliers de recettes et trouver de nouvelles combinaisons originales.
					</p>
					<p>
						Vous pouvez en savoir plus à propos de cette activité et trouver des liens vers{' '}
						<a
							onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://steamlabs.ca/ai-programs/predict-a-pie/')}
							href='https://steamlabs.ca/ai-programs/predict-a-pie'
							target='_new'
						>
							des présentations éducatives sur l'IA
						</a>{' '}
						sur le site web de Steamlabs.
					</p>
					<p>
						Cette application web se divise principalement en deux sections : "Construire un réseau neuronal" et "Tester un modèle pré-entraîné". Vous pouvez y accéder à tout moment à partir du menu
						situé dans le coin supérieur gauche.
					</p>
					<h2>Construire un réseau neuronal (RN)</h2>
					<p>
						Dans cette activité, vous pouvez construire un réseau neuronal réel et fonctionnel. Les <Definition text={strings.neuronDef}>neurones</Definition> de la première couche (celle de gauche)
						sont vos "entrées". Considérez-les comme les ingrédients, ou les éléments d'information sur lesquels votre RN fondera ses décisions. La dernière couche (à droite) de{' '}
						<Definition text={strings.neuronDef}>neurones</Definition> représente les décisions, ou "classifications", que le réseau neuronal peut prendre sur la base de ces entrées. Ajoutez les{' '}
						<Definition text={strings.neuronDef}>neurones</Definition> un par un, connectez-les entre eux pour indiquer quelles entrées mènent à quelles décisions de sortie. Si vous devez détecter des
						combinaisons d'entrées, vous pouvez ajouter des "couches cachées" au milieu pour détecter ces combinaisons. Si nécessaire, vous pouvez cliquer sur le symbole (+) ou (-) de n'importe quel
						nœud et modifier les "poids" pour indiquer l'importance relative de chaque nœud entrant.
					</p>

					<h2>Tester un réseau neuronal pré-entraîné</h2>
					<p>Cette activité peut être réalisée seul ou en groupe. Pour un groupe, commencez par "Créer une salle de classe", et demandez à chacun d'aller sur l'URL générée.</p>
					<p>
						Le réseau neuronal de cette activité a été entraîné sur des milliers de recettes pour être capable de classifier n'importe quelle combinaison d'ingrédients comme étant une tarte "Sucrée",
						une "Quiche", une "Pizza", un "Pâté" ou quelque chose d'"Autre". Il peut maintenant généraliser et classifier n'importe quelle combinaison d'ingrédients disponibles.
					</p>
					<p>
						Essayez différentes combinaisons d'ingrédients et voyez ce que le réseau neuronal en pense ! Vous pouvez également cliquer sur le bouton "Trouver une recette" pour générer une nouvelle
						recette.
					</p>
					<p>Sauvegardez les recettes que vous aimez pour pouvoir les consulter ultérieurement.</p>
					<p>
						Vous pouvez signaler les classifications avec lesquelles vous n'êtes pas en accord et sélectionnez la classification correcte. Sur la page "Voir les statistiques de la classe", vous pouvez
						voir les classifications d'autres participants et vérifier s'ils sont d'accord avec vous.
					</p>

					<h1>À propos de cette application</h1>

					<h2>Crédits</h2>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' width='150' border='0' align='left' />
						</a>{' '}
						"Predict-a-Pie" est une création de{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							Steamlabs
						</a>
						.
						<br clear='left' />
					</p>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://kidscodejeunesse.org/')} href='https://kidscodejeunesse.org/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png' width='150' border='0' align='left' />
						</a>{' '}
						Co-conçu par{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							Steamlabs
						</a>{' '}
						et{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://kidscodejeunesse.org/')} href='https://kidscodejeunesse.org/' target='_new'>
							Kids Code Jeunesse
						</a>
						.
						<br clear='left' />
					</p>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.amazonfutureengineer.com/')} href='https://www.amazonfutureengineer.com/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png' width='150' border='0' align='left' />
						</a>{' '}
						Créé grâce au financement de{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.amazonfutureengineer.com/')} href='https://www.amazonfutureengineer.com/' target='_new'>
							Amazon Future Engineer
						</a>
						.
						<br clear='left' />
					</p>

					<h2>License</h2>

					<p>Sous licence Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
					<p>
						En résumé, vous êtes libre de :
						<ul>
							<li>partager - copier et redistribuer le matériel sur tout support ou format</li>
							<li>Adapter - remixer, transformer et développer le matériel à toutes fins, même commerciales.</li>
						</ul>
					</p>
					<p>
						Sous les conditions suivantes :
						<ul>
							<li>
								Attribution - Vous devez donner le crédit approprié, fournir un lien vers la licence et indiquer si des modifications ont été apportées. Vous pouvez le faire de toute manière
								raisonnable, mais pas d'une manière qui suggère que le donneur de licence vous approuve ou approuve votre utilisation.
							</li>
							<li>ShareAlike - Si vous remixez, transformez ou développez le matériel, vous devez distribuer vos contributions sous la même licence que l'original.</li>
						</ul>
					</p>
					<p>
						Les détails complets de cette licence peuvent être trouvés ici :{' '}
						<a
							onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://creativecommons.org/licenses/by-sa/4.0/')}
							href='https://creativecommons.org/licenses/by-sa/4.0/'
							target='_new'
						>
							https://creativecommons.org/licenses/by-sa/4.0/
						</a>
					</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className='Instructions'>
				<div className='Instructions-container'>
					<h1>Predict a Pie with a Neural Network</h1>
					<p>
						What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop, you will wire up a neural network to do just that! You
						will then use your new knowledge to test a larger neural network that has used “machine learning” to analyse thousands of recipes to come up with new, creative combinations.
					</p>
					<p>
						You can read more about this activity and find links to{' '}
						<a
							onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://steamlabs.ca/ai-programs/predict-a-pie')}
							href='https://steamlabs.ca/ai-programs/predict-a-pie'
							target='_new'
						>
							educational presentations on AI on the Steamlabs website
						</a>
						.
					</p>
					<p>There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left corner</p>
					<h2>Build a Neural Network (NN)</h2>
					<p>
						In this activity, you can build a real, working Neural Network. The <Definition text={strings.neuronDef}>neuron</Definition> nodes in the first layer on the left are your “inputs”. Think
						of these as the ingredients, or pieces of information that your NN will base its decisions on. The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the
						decisions, or “classifications” that the neural network can make based on these inputs. Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time, connect them together
						to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add “hidden layers” in the middle to detect these combinations. If necessary,
						you can click on the (+) or (-) symbol on any node and change the “weights” to indicate the relative importance of each incoming node.
					</p>

					<h2>Test a Trained Neural Network</h2>
					<p>This activity can be done on your own, or with a group. For a group, start with “Create Classroom”, and have everyone go to the URL that it generates.</p>
					<p>
						The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as “Sweet Pie”, “Quiche”, “Savoury Pie” and “Disgusting” from a combination
						of the input ingredients. Now it can generalize and classify any of the millions of combinations of recipes.
					</p>
					<p>Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the “Find Recipe” button to search for a recipe.</p>
					<p>Save the recipes that you like for future reference.</p>
					<p>Find classifications that you disagree with, and input the correct classification. On the “View Classroom Stats” page you can see if others agreed with you.</p>

					<h1>About this app</h1>

					<h2>Credits</h2>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' width='150' border='0' align='left' />
						</a>{' '}
						Predict-a-Pie is a creation of{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							Steamlabs
						</a>
						.
						<br clear='left' />
					</p>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://kidscodejeunesse.org/')} href='https://kidscodejeunesse.org/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png' width='150' border='0' align='left' />
						</a>{' '}
						Co-designed by{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
							Steamlabs
						</a>{' '}
						and{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://kidscodejeunesse.org/')} href='https://kidscodejeunesse.org/' target='_new'>
							Kids Code Jeunesse
						</a>
						.
						<br clear='left' />
					</p>
					<p>
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.amazonfutureengineer.com/')} href='https://www.amazonfutureengineer.com/' target='_new'>
							<img src='https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png' width='150' border='0' align='left' />
						</a>{' '}
						Created with funding from{' '}
						<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://www.amazonfutureengineer.com/')} href='https://www.amazonfutureengineer.com/' target='_new'>
							Amazon Future Engineer
						</a>
						.
						<br clear='left' />
					</p>

					<h2>License</h2>

					<p>Licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)</p>
					<p>
						In summary, you are free to:
						<ul>
							<li>Share — copy and redistribute the material in any medium or format</li>
							<li>Adapt — remix, transform, and build upon the material for any purpose, even commercially.</li>
						</ul>
					</p>
					<p>
						Under the following terms:
						<ul>
							<li>
								Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that
								suggests the licensor endorses you or your use.
							</li>
							<li>ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
						</ul>
					</p>
					<p>
						Full details of this license can be found here:{' '}
						<a
							onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound', 'https://creativecommons.org/licenses/by-sa/4.0/')}
							href='https://creativecommons.org/licenses/by-sa/4.0/'
							target='_new'
						>
							https://creativecommons.org/licenses/by-sa/4.0/
						</a>
					</p>
				</div>
			</div>
		);
	}
}

export default Instructions;
