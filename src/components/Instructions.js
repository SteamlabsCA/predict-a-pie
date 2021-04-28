import './Instructions.scss';
import Definition from './Definition';
import React from 'react';
import { strings } from './App';

function Instructions() {

  if (strings.getLanguage() == 'fr') {
    return (
      <div className="Instructions">
      <div className="Instructions-container">
        <h1>French About Page to come</h1>
        <h1>Predict a Pie with a Neural Network</h1>
        <p>
          What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop, you will wire up a neural network to do just that! 
    You will then use your new knowledge to test a larger neural network that has used “machine learning” to analyse thousands of recipes to come up with new, creative combinations.

    </p>
    <p>
    You can read more about this activity and find links to <a href="https://steamlabs.ca/ai-programs/predict-a-pie" target="_new">educational presentations on AI on the Steamlabs website</a>.

    
    </p>
    <p>
    There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left corner

        </p>
        <h2>Build a Neural Network (NN)</h2>
        <p>
          In this activity, you can build a real, working Neural Network.
The <Definition text={strings.neuronDef}>neuron</Definition> nodes in the first layer on the left are your “inputs”. Think of these as the ingredients, or pieces of information that your NN will base its decisions on. 
The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the decisions, or “classifications” that the neural network can make based on these inputs.
Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time, connect them together to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add “hidden layers” in the middle to detect these combinations.
If necessary, you can click on the (+) or (-) symbol on any node and change the “weights” to indicate the relative importance of each incoming node.

        </p>
    
    
    <h2>Test a Trained Neural Network</h2>
    <p>
    This activity can be done on your own, or with a group. For a group, start with “Create Classroom”, and have everyone go to the URL that it generates.
    </p>
    <p>
    The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as “Sweet Pie”, “Quiche”, “Savoury Pie” and “Disgusting” from a combination of the input ingredients. Now it can generalize and classify any of the millions of combinations of recipes. 
    </p>
    <p>
    Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the “Find Recipe” button to search for a recipe.
    </p>
    <p>
    Save the recipes that you like for future reference. 
    </p>
    <p>
    Find classifications that you disagree with, and input the correct classification. On the “View Classroom Stats” page you can see if others agreed with you.
    </p>
    
    <h1>About this app</h1>
    
    <h2>Credits</h2>
    <p>
      <a href="https://www.steamlabs.ca/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg" width="150" border="0" align="left" /></a> Predict-a-Pie is a creation of <a href="https://www.steamlabs.ca/" target="_new">Steamlabs</a>.
      <br clear="left" />
    </p>
    <p>
      <a href="https://kidscodejeunesse.org/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png" width="150" border="0" align="left" /></a> Co-designed by <a href="https://www.steamlabs.ca/" target="_new">Steamlabs</a> and <a href="https://kidscodejeunesse.org/" target="_new">Kids Code Jeunesse</a>.
      <br clear="left" />
    </p>
    <p>
      <a href="https://www.amazonfutureengineer.com/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png" width="150" border="0" align="left" /></a> Created with funding from <a href="https://www.amazonfutureengineer.com/" target="_new">Amazon Future Engineer</a>.
      <br clear="left" />
    </p>
    
    <h2>License</h2>

    <p>
Licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
</p>
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
<li>Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.</li>
<li>ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
</ul>
</p>
    <p>
Full details of this license can be found here: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_new">https://creativecommons.org/licenses/by-sa/4.0/</a>
</p>
    
      </div>
    </div>
    );
  } else {
    return (
      <div className="Instructions">
        <div className="Instructions-container">
          <h1>Predict a Pie with a Neural Network</h1>
          <p>
            What makes a pie taste the best? What if you had all the ingredients in the world to come up with the perfect pie? In this workshop, you will wire up a neural network to do just that! 
			You will then use your new knowledge to test a larger neural network that has used “machine learning” to analyse thousands of recipes to come up with new, creative combinations.

			</p>
			<p>
			You can read more about this activity and find links to <a href="https://steamlabs.ca/ai-programs/predict-a-pie" target="_new">educational presentations on AI on the Steamlabs website</a>.

			
			</p>
			<p>
			There are two main activities that you can do in this web application. You can access them at any time from the menu in the top left corner

          </p>
          <h2>Build a Neural Network (NN)</h2>
          <p>
            In this activity, you can build a real, working Neural Network.
The <Definition text={strings.neuronDef}>neuron</Definition> nodes in the first layer on the left are your “inputs”. Think of these as the ingredients, or pieces of information that your NN will base its decisions on. 
The last layer of <Definition text={strings.neuronDef}>neurons</Definition> are the decisions, or “classifications” that the neural network can make based on these inputs.
Add <Definition text={strings.neuronDef}>neurons</Definition> one at a time, connect them together to indicate what inputs lead to what output decisions. If you need to detect combinations of inputs, you can add “hidden layers” in the middle to detect these combinations.
If necessary, you can click on the (+) or (-) symbol on any node and change the “weights” to indicate the relative importance of each incoming node.

          </p>
		  
		  
		  <h2>Test a Trained Neural Network</h2>
		  <p>
			This activity can be done on your own, or with a group. For a group, start with “Create Classroom”, and have everyone go to the URL that it generates.
			</p>
			<p>
			The Neural Network in this activity has been trained on thousands of recipes to be able to classify any recipe as “Sweet Pie”, “Quiche”, “Savoury Pie” and “Disgusting” from a combination of the input ingredients. Now it can generalize and classify any of the millions of combinations of recipes. 
			</p>
			<p>
			Try different combinations of ingredients and see what the Neural Network thinks of them! You can also click on the “Find Recipe” button to search for a recipe.
			</p>
			<p>
			Save the recipes that you like for future reference. 
			</p>
			<p>
			Find classifications that you disagree with, and input the correct classification. On the “View Classroom Stats” page you can see if others agreed with you.
			</p>
			
			<h1>About this app</h1>
			
			<h2>Credits</h2>
			<p>
				<a href="https://www.steamlabs.ca/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2020/04/SteamLabs_Wordmark_RGB_Blue.jpg" width="150" border="0" align="left" /></a> Predict-a-Pie is a creation of <a href="https://www.steamlabs.ca/" target="_new">Steamlabs</a>.
				<br clear="left" />
			</p>
			<p>
				<a href="https://kidscodejeunesse.org/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2021/01/300px-KCJ.png" width="150" border="0" align="left" /></a> Co-designed by <a href="https://www.steamlabs.ca/" target="_new">Steamlabs</a> and <a href="https://kidscodejeunesse.org/" target="_new">Kids Code Jeunesse</a>.
				<br clear="left" />
			</p>
			<p>
				<a href="https://www.amazonfutureengineer.com/" target="_new"><img src="https://steamlabs.ca/wp-content/uploads/2021/04/Amazon-Future-Engineer-Logo.png" width="150" border="0" align="left" /></a> Created with funding from <a href="https://www.amazonfutureengineer.com/" target="_new">Amazon Future Engineer</a>.
				<br clear="left" />
			</p>
			
			<h2>License</h2>

			<p>
Licensed under Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
</p>
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
<li>Attribution — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.</li>
<li>ShareAlike — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.</li>
</ul>
</p>
			<p>
Full details of this license can be found here: <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_new">https://creativecommons.org/licenses/by-sa/4.0/</a>
</p>
			
        </div>
      </div>
    );
  }
}

export default Instructions;
