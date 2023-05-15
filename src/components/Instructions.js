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
									Qu'est-ce qui fait qu'un pâté est plus savoureux qu'un autre? Et si vous aviez tous les ingrédients du monde pour créer la tarte parfaite? Dans cet atelier, vous allez créer un
									réseau neuronal pour y parvenir! Vous utiliserez ensuite vos nouvelles connaissances pour tester un plus grand réseau neuronal qui a été créé à partir de l'apprentissage automatique
									dans le but d'analyser des milliers de recettes et trouver de nouvelles combinaisons originales.
								</p>
								<p>
									Vous souhaitez en savoir plus ? Visitez le{' '}
									<a
										onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://steamlabs.ca/ai-programs/predict-a-pie', 'https://steamlabs.ca/ai-programs/predict-a-pie')}
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
									Nous aimerions recevoir vos questions ! Envoyez-nous un courriel à l'adresse info@steamlabs.ca et nous vous répondrons en ajoutant vos questions et vos réponses à la à la section FAQ
									de cette page.
								</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='sctn-title'>
						<strong>
							La cuisine autochtone avec un <em>soupçon</em> d'IA
						</strong>
					</div>
					<div className='video-sctn'>
						<div>
							<h2>Vidéo éducative et tutoriel</h2>
							<p>
								Découvrez la cuisine fusion autochtone avec le chef cuisinier David Wolfman de la Première Nation des Xaxli'ps. Apprenez à utiliser un simulateur de réseau neuronal afin de générer de
								nouvelles recettes pour un restaurant ! Vous découvrirez l'impact des biais provenant des données lorsqu'elles excluent les types de cuisine provenant de différentes cultures. En
								effet, ces biais peuvent nous empêcher de profiter pleinement de la richesse qu'offre le partage entre les différentes cultures. De plus ce biais peuvent avoir pour effet d'accentuer
								la marginalisation de certaines communautés. Nous montrons ensuite comment vous pouvez construire votre propre modèle à partir de vos propres données en utilisant notre simulateur de
								réseau neuronal.
							</p>
						</div>
						<div className='video-container'>
							<div className='sctn'>
								<h2>Vidéo intégrale</h2>
								<p className='aligned-p'>
									Si vous êtes débutant en matière d'IA et d'apprentissage automatique, cette vidéo est faite pour vous ! Utilisée comme un outil en libre-service, cette vidéo couvre les bases de la
									programmation de l'apprentissage automatique et des réseaux neuronaux. Nous y consultons le chef cuisinier autochtone David Wolfman afin de tester notre modèle et de discuter des
									questions éthiques liées à l'IA. Le chef Wolfman y crée un nouveau modèle qui correspond mieux à ses propres valeurs et principes culinaires autochtones.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/9niAf2fAuhw'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
							<div className='sctn'>
								<h2>Vidéo écourtée - uniquement le contenu autochtone</h2>
								<p className='aligned-p'>
									Si vous envisagez d'utiliser cette application web dans votre classe pour soutenir votre cours d'IA et de réseaux neuronaux, cette vidéo est pour vous ! Cette vidéo couvre l'ensemble
									de notre consultation avec le chef cuisinier autochtone, David Wolfman. Le chef Wolfman teste notre modèle de prédiction de pâtés et discute ensuite des biais potentiels et des
									implications éthiques de l'IA. Le chef Wolfman crée un nouveau modèle qui correspond mieux à ses propres valeurs et principes culinaires autochtones.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/pofctfKPokI'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
					<div className='Instructions-sctTwo'>
						Il y a deux activités principales que vous pouvez faire dans cette application web. Vous pouvez y accéder à tout moment à partir du menu qui se trouve dans le coin supérieur gauche
					</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Construire un réseau neuronal (RN)</h2>
							<p>
								Dans cette activité, vous pouvez construire un réseau neuronal réel et fonctionnel. Les <Definition text={strings.neuronDef}>neurones</Definition> de la première couche (celle de
								gauche) sont vos "entrées". Considérez-les comme les ingrédients, ou les éléments d'information sur lesquels votre RN fondera ses décisions. La dernière couche (à droite) de{' '}
								<Definition text={strings.neuronDef}>neurones</Definition> représente les décisions, ou "classifications", que le réseau neuronal peut prendre sur la base de ces entrées. Ajoutez les{' '}
								<Definition text={strings.neuronDef}>neurones</Definition> un par un, connectez-les entre eux pour indiquer quelles entrées mènent à quelles décisions de sortie. Si vous devez détecter
								des combinaisons d'entrées, vous pouvez ajouter des "couches cachées" au milieu pour détecter ces combinaisons. Si nécessaire, vous pouvez cliquer sur le symbole (+) ou (-) de
								n'importe quel nœud et modifier les "poids" pour indiquer l'importance relative de chaque nœud entrant.
							</p>
						</div>
						<div>
							<h2>Tester un réseau neuronal pré-entraîné</h2>
							<p>Cette activité peut être réalisée seul ou en groupe. Pour un groupe, commencez par "Créer une salle de classe", et demandez à chacun d'aller sur l'URL générée.</p>
							<p>
								Le réseau neuronal de cette activité a été entraîné sur des milliers de recettes pour être capable de classifier n'importe quelle combinaison d'ingrédients comme étant une tarte
								"Sucrée", une "Quiche", une "Pizza", un "Pâté" ou quelque chose d'"Autre". Il peut maintenant généraliser et classifier n'importe quelle combinaison d'ingrédients disponibles.
							</p>
							<p>
								Essayez différentes combinaisons d'ingrédients et voyez ce que le réseau neuronal en pense ! Vous pouvez également cliquer sur le bouton "Trouver une recette" pour générer une nouvelle
								recette.
							</p>
							<p>
								Sauvegardez les recettes que vous aimez pour pouvoir les consulter ultérieurement. Vous pouvez signaler les classifications avec lesquelles vous n'êtes pas en accord et sélectionnez la
								classification correcte. Sur la page "Voir les statistiques de la classe", vous pouvez voir les classifications d'autres participants et vérifier s'ils sont d'accord avec vous.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remixer Predict a Pie</h2>
							<p>Lorsque vous remixez Predict a Pie, vous créez une copie du projet existant. A partir de là, vous pourrez personnaliser le projet et faire d'autres modifications.</p>
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
							<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie est une création de Steamlabs.
						</p>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: http://www.cookingwiththewolfman.com/home.html', 'http://www.cookingwiththewolfman.com/home.html')}
								href='http://www.cookingwiththewolfman.com/home.html'
								target='_new'
							>
								<img src='./ChefWolfmanLogo.gif' />
							</a>
							Consultation avec David Wolfman et Marlene Finn
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
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.amazonfutureengineer.com/', 'https://www.amazonfutureengineer.com/')}
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
									Attribution - Vous devez donner le crédit approprié, fournir un lien vers la licence et indiquer si des modifications ont été apportées. Vous pouvez le faire de toute manière
									raisonnable, mais pas d'une manière qui suggère que le donneur de licence vous approuve ou approuve votre utilisation.
								</li>
								<li>ShareAlike - Si vous remixez, transformez ou développez le matériel, vous devez distribuer vos contributions sous la même licence que l'original.</li>
							</p>
						</ul>
						<p>
							Les détails complets de cette licence peuvent être trouvés ici :{' '}
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://creativecommons.org/licenses/by-sa/4.0/', 'https://creativecommons.org/licenses/by-sa/4.0/')}
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
	} else if (strings.getLanguage() == 'no') {
		return (
			<div className='Instructions'>
				<div className='Instructions-container'>
					<div className='Instructions-sctOne'>
						<span>
							<span className='Instructions-title'>
								<h1>Gjett en rett </h1>
								<h1>med et nevralt nettverk</h1>
							</span>
							<div className='body'>
								<p>
									Hva får en pai til å smake best? Hva om du hadde alle ingrediensene i hele verden tilgjengelig for å lage den perfekte paien? I denne workshopen vil du koble opp en nevralt nettverk for å gjøre akkurat
									det! Du vil så få brukt den nye kunnskapen din til å teste et større nevralt nettverk som har brukt maskinlæring for å analysere tusenvis av oppskrifter for å komme opp med nye, kreative
									kombinasjoner.
								</p>
								<p>
									Interessert i å lære mer? Besøk{' '}
									<a
										onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://steamlabs.ca/ai-programs/predict-a-pie', 'https://steamlabs.ca/ai-programs/predict-a-pie')}
										href='https://steamlabs.ca'
										target='_new'
									>
										Steamlabs' nettsider
									</a>{' '}
									for å:
								</p>
								<ul>
									<p>
										<li>Lese mer om denne aktiviteten eller andre AI-aktiviteter</li>
										<li>Finne linker til presentasjoner (på engelsk) om denne aktiviteten</li>
										<li>Ofte stilte spørsmål om hvordan denne AI-aktiviteten fungerer og tekniske spørsmål rundt bygging av ditt eget nettverk</li>
									</p>
								</ul>
								<p>Spørsmål? Send en epost til info@steamlabs.ca (på engelsk) så vil vi komme tilbake til deg.</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='sctn-title'>
						<strong>
							Matlaging med en <em>dæsj</em> AI
						</strong>
					</div>
					<div className='video-sctn'>
						<div>
							<h2>Educational and Tutorial Video</h2>
							<p>
								Lær om kanadisk urfolk-fusjonsmatlaging fra Xaxli’p First Nation-kokk David Wolfman og hvordan du kan bruke en AI-simulator for nevrale nettverk for å generere oppskrifter til en restaurant!
								Du vil lære om hvordan data kan være skjev og hvordan utelukkelse av matlaging fra et bredt spekter av kulturer kan ha negative konsekvenser. Dette kan føre til at man går glipp av den rike
								mangfoldigheten av erfaringer som kan deles fra andre kulturer, og risikere å marginalisere disse samfunnene. Deretter viser vi hvordan du kan bygge din egen modell fra dine egne data ved
								hjelp av vår simulator for nevrale nettverk.
							</p>
						</div>
						<div className='video-container'>
							<div className='sctn'>
								<h2>Hele videoen</h2>
								<p className='aligned-p'>
									Hvis du er helt ny innen AI og maskinlæring, er dette en video for deg! Som et verktøy for selvbetjening dekker denne videoen grunnleggende om programmering av maskinlæring og nevrale nettverk.
									Vi konsulterer med urfolkskokk David Wolfman, for å teste ut vår modell og deretter diskutere potensielle treningsforutsetninger og etiske implikasjoner av AI. Chief Wolfman lager en ny modell som
									bedre imøtekommer hans egne verdier og prinsipper for innfødt sammensatt kulinarisk matlaging.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/9niAf2fAuhw'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
							<div className='sctn'>
								<h2>Utrdag - Bare urfolksinnhold</h2>
								<p className='aligned-p'>
									Skal du bruke denne webappen i klasserommet for å støtte leksjoner om AI og nevrale nettverk, er dette versjonen du trenger! Videoen dekker alle våre samtaler med urfolkskokk David Wolfman.
									Wolfman tester ut vår "gjett en rett"-modell og diskuterer potensielle trenings-skjevheter og etiske implikasjoner med AI. Han bygger en modell som passer bedre til hans egen matlagingsstil og prinsipper.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/pofctfKPokI'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
					<div className='Instructions-sctTwo'>Det er to hovedaktiviteter du kan gjøre på disse nettsidene. Du har tilgang til dem når som helst fra menyen i øverste venstre hjørne.</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Bygg et nevralt nettverk (NN)</h2>
							<p>
								I denne aktiviteten bygger du et ekte, fungerende nevralt nettverk. <Definition text={strings.neuronDef}>Nevronene</Definition>, eller inngangsnodene om du vil, i det første laget er dine "inndata".
								Tenk på disse som ingrediensene, eller informasjonen som ditt NN vil basere sine avgjørelser på. Det siste laget med <Definition text={strings.neuronDef}>nevroner</Definition> (utgangsnoder) er 
								beslutningene, resultatene, eller "klassifiseringene" som det nevrale nettverket kan gjøre basert på inndataene. Legg til <Definition text={strings.neuronDef}>nevroner</Definition> og koble dem
								sammen for å bestemme hvilke inngangsnoder som vil påvirke hvilke resultater. Trenger du å oppdage kombinasjoner av inngangsverdier, kan du legge til "skjulte lag" i midten for å oppdage disse kombinasjonene. Om
								nødvendig, kan du klikke på symbolene (+) eller (-) på nodene og forandre "vektingen", eller hvor mye hver inngangsverdi har å si for utgangsverdien.
							</p>
						</div>
						<div>
							<h2>Test et nevralt nettverk</h2>
							<p>Denne aktiviteten kan gjøres på egenhånd, eller i klasser. For klasser, trykk på "Lag klasserom", og del URL-en med elevene.</p>
							<p>
								Det nevrale nettverket i denne aktiviteten har blitt trenet på tusenvis av oppskrifter for å kunne klassifisere enhver oppskrift som "Søt pai", "Quiche", "Middagspai" and "Ekkelt" fra
								kombinasjonen av ingredienser. Nå kan den generalisere og klassifisere hvilken som helst av de mange millioner av muligheter.
							</p>
							<p>Prøv forskjellige kombinasjoner av ingredienser og se hva det nevrale nettverket syns om dem! Du kan også trykke på "Finn oppskrift"-knappen for å søke etter en oppskrift.</p>
							<p>
								Lagre oppskriftene du er fornøyd med. Finn klassifikasjoner du er uenig med, og skriv inn hva du mener den burde vært klassifisert som. På "Vis statistikk"-siden kan du se om andre
								er enige med deg.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remiks av prosjektet</h2>
							<p>Når du remikser dette prosjektet, lager du en kopi av det eksisterende prosjektet. Deretter kan du tilpasse det og gjøre endringer.</p>
							<h3 style={{ marginBottom: 0 }}>Hvordan remikse</h3>
							<p style={{ marginTop: 0 }}>
								For å remikse prosjektet, trykk på fiskeikonet
								<img
									src='https://cdn.glitch.com/1973df30-22e4-49d9-94b0-9a3b017066bc%2FGlitchLogo_Color.svg?v=1613667290307'
									width='50px'
									style={{ position: 'relative', top: '15px', margin: '0 15px' }}
								/>
								og trykk på <strong>'Remix on Glitch'</strong>.
							</p>
							<p> For å lage prosjektet til ditt eget må du "booste" det for å gi plass til ekstra minne og lagringsplass.</p>
							<h3>Fra her, kan du:</h3>
							<ul style={{ marginBottom: '30px' }}>
								<p>
									<li>Redigere filene i originalprosjektet</li>
									<li>Forandre navnet på prosjektet.</li>
									<li>Tilpasse det og gjør det til ditt eget!</li>
								</p>
							</ul>
						</>
					)}
					<h2>Om denne nettsiden (på engelsk)</h2>
					<h3>Credits</h3>
					<div className='Instructions-sctFour'>
						<p>
							<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie is a creation of Steamlabs.
						</p>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: http://www.cookingwiththewolfman.com/home.html', 'http://www.cookingwiththewolfman.com/home.html')}
								href='http://www.cookingwiththewolfman.com/home.html'
								target='_new'
							>
								<img src='./ChefWolfmanLogo.gif' />
							</a>
							Consultation with David Wolfman and Marlene Finn
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
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.amazonfutureengineer.com/', 'https://www.amazonfutureengineer.com/')}
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
									Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that
									suggests the licensor endorses you or your use.
								</li>
								<li>ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
							</p>
						</ul>
						<p>
							Full details of this license can be found here:{' '}
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://creativecommons.org/licenses/by-sa/4.0/', 'https://creativecommons.org/licenses/by-sa/4.0/')}
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
									What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop, you will wire up a neural network to do just
									that! You will then use your new knowledge to test a larger neural network that has used "machine learning" to analyse thousands of recipes to come up with new, creative
									combinations.
								</p>
								<p>
									Interested in learning more? Visit the{' '}
									<a
										onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://steamlabs.ca/ai-programs/predict-a-pie', 'https://steamlabs.ca/ai-programs/predict-a-pie')}
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
								<p>We’d love to hear your questions! Email us at info@steamlabs.ca and we will get back to you and add your questions and answers to the page’s FAQ.</p>
							</div>
						</span>
						<span>
							<img src='./PredictPie.jpg' />
						</span>
					</div>
					<div className='sctn-title'>
						<strong>
							Indigenous Cooking with a <em>dash</em> of AI
						</strong>
					</div>
					<div className='video-sctn'>
						<div>
							<h2>Educational and Tutorial Video</h2>
							<p>
								Learn about Indigenous-fusion cooking practices from Xaxli’p First Nation chef, David Wolfman and how to use an AI Neural Network simulator to generate new recipes for a restaurant!
								You will learn about how data can be biased and how excluding cooking from a wide array of cultures can have negative impacts. This can lead to missing out on the rich diversity of
								experiences that can be shared from other cultures, and risk marginalizing those communities. We then show how you can build your own model from your own data using our Neural Network
								simulator.
							</p>
						</div>
						<div className='video-container'>
							<div className='sctn'>
								<h2>Full Video</h2>
								<p className='aligned-p'>
									If you are coming here totally new to AI and machine learning, this is a video for you! Used as a self service tool, this video covers the basics of machine learning programming and
									neural networks. We consult with Indigenous chef, David Wolfman to test out our model and then discuss the potential training biases and ethical implications of AI. Chef Wolfman
									creates a new model that better caters to his own Indigenous fusion culinary values and principles.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/9niAf2fAuhw'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
							<div className='sctn'>
								<h2>Shortened Video - Only Indigenous Content</h2>
								<p className='aligned-p'>
									If you are planning to use this webapp with your classroom/ educational group to support your AI and neural network lesson, this video is for you! This video covers all of our
									consultation with Indigenous chef, David Wolfman. Chef Wolfman tests out our predict a pie model and then discusses the potential training biases and ethical implications of AI. Chef
									Wolfman creates a new model that better caters to his own Indigenous fusion culinary values and principles.
								</p>
								<iframe
									src='https://www.youtube-nocookie.com/embed/pofctfKPokI'
									title='YouTube video player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								></iframe>
							</div>
						</div>
					</div>
					<div className='Instructions-sctTwo'>There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left corner</div>
					<div className='Instructions-sctThree'>
						<div>
							<h2>Build a Neural Network (NN)</h2>
							<p>
								In this activity, you can build a real, working Neural Network. The <Definition text={strings.neuronDef}>neuron</Definition> nodes in the first layer on the left are your "inputs".
								Think of these as the ingredients, or pieces of information that your NN will base its decisions on. The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the
								decisions, or "classifications" that the neural network can make based on these inputs. Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time, connect them
								together to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add "hidden layers" in the middle to detect these combinations. If
								necessary, you can click on the (+) or (-) symbol on any node and change the "weights" to indicate the relative importance of each incoming node.
							</p>
						</div>
						<div>
							<h2>Test a Trained Neural Network</h2>
							<p>This activity can be done on your own, or with a group. For a group, start with "Create Classroom", and have everyone go to the URL that it generates.</p>
							<p>
								The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as "Sweet Pie", "Quiche", "Savoury Pie" and "Disgusting" from a
								combination of the input ingredients. Now it can generalize and classify any of the millions of combinations of recipes.
							</p>
							<p>Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the "Find Recipe" button to search for a recipe.</p>
							<p>
								Save the recipes that you like for future reference. Find classifications that you disagree with, and input the correct classification. On the "View Stats" page you can see if others
								agreed with you.
							</p>
						</div>
					</div>

					{window.location.origin.includes('glitch') && (
						<>
							<h2>Remixing Predict a Pie</h2>
							<p>When you remix Predict a Pie, you’re creating a copy of the existing project. From there, you can customize the project and make other changes.</p>
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
							<a onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.steamlabs.ca/', 'https://www.steamlabs.ca/')} href='https://www.steamlabs.ca/' target='_new'>
								<img src='https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg' />
							</a>
							Predict-a-Pie is a creation of Steamlabs.
						</p>
						<p>
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: http://www.cookingwiththewolfman.com/home.html', 'http://www.cookingwiththewolfman.com/home.html')}
								href='http://www.cookingwiththewolfman.com/home.html'
								target='_new'
							>
								<img src='./ChefWolfmanLogo.gif' />
							</a>
							Consultation with David Wolfman and Marlene Finn
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
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://www.amazonfutureengineer.com/', 'https://www.amazonfutureengineer.com/')}
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
									Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that
									suggests the licensor endorses you or your use.
								</li>
								<li>ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
							</p>
						</ul>
						<p>
							Full details of this license can be found here:{' '}
							<a
								onClick={() => gtmTrack('out_btn_click', 'Instructions', 'Out Bound: https://creativecommons.org/licenses/by-sa/4.0/', 'https://creativecommons.org/licenses/by-sa/4.0/')}
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
