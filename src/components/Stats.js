import './Stats.scss';
import { classifications, ingredients } from './App';
import Gauge from './Gauge';
import React from 'react';

function Stats({appData, ingredients, classifications, recipes}) {

  const [myRecipes, setMyRecipes] = React.useState([]);
  const [allRecipes, setAllRecipes] = React.useState([]);

  // Defaults
  let reclassifications = [];
  let correct = [];
  let incorrect = [];

  /*React.useEffect(() => {

    console.log('compile');

    // Compile stats
    const recipeHash = {};
    recipes.map(recipe => {
      let hashId = '';
      let classification = -1;
      for (let i = 0; i < ingredients.length; i++) {
        hashId += recipe[ingredients[i]];
      }
      for (let i = 0; i < classifications.length; i++) {
        if (recipe[classifications[i]] === 1) {
          classification = i;
        }
      }
      recipeHash[hashId] = {
        'classification': classification,
        'reclassified': false,
        'reclassifications': new Array(classifications.length).fill(0)
      };
    });

    if (appData.classroom) {
      console.log('classrom');
      setReclassications(appData.classroom.reclassifications);
      setMyRecipes(appData.classroom.recipes.filter(recipe => recipe.userId === appData.userId));
      setAllRecipes(appData.classroom.recipes);

      // Add classroom recipes
      appData.classroom.recipes.map(recipe => {
        let hashId = recipe.ingredients.join('');
        if (recipeHash[hashId] === undefined) {
          recipeHash[hashId] = {
            'classification': recipe.original_classification,
            'reclassified': false,
            'reclassifications': new Array(classifications.length).fill(0)
          }
        }
      });

      // Tally reclassifications
      appData.classroom.reclassifications.map(reclassification => {
        let hashId = reclassification.recipe.join('');
        if (recipeHash[hashId]) {
          recipeHash[hashId].reclassifications[reclassification.reclassification]++;
          if (reclassification.original_classification != reclassification.reclassification) {
            recipeHash[hashId].reclassified = true;
          }
        }
      });
    }
  }, [appData, classifications, recipes]);*/

  const listIngredients = (items) => {
    return items.map((item, index) => {
      if (item) return ingredients[index];
    }).filter(item => item != null).join(', ');
  };

  // Use classroom data
  if (appData.classroom) {
    reclassifications = appData.classroom.reclassifications;
  }

  // Correct classifications
  correct = reclassifications.filter(item => {
    return item.original_classification === item.reclassification;
  });

  // Incorrect classifications
  incorrect = reclassifications.filter(item => {
    return item.original_classification !== item.reclassification;
  });

  // Accuracy
  const accuracy = reclassifications.length > 0 ?
    correct.length / reclassifications.length : 1;

  return (
    <div className="Stats">
      <div className="Stats-container">
        <div className="Stats-dashboard">
          <div className="Stats-dashboard-item">
            <h2>
              Total<br/>
              Predictions
            </h2>
            <p>{reclassifications.length}</p>
          </div>
          <div className="Stats-dashboard-item">
            <h2>
              Correct<br/>
              Classifications
            </h2>
            <p>{correct.length}</p>
          </div>
          <div className="Stats-dashboard-item">
            <h2>
              Incorrect<br/>
              Classifications
            </h2>
            <p>{incorrect.length}</p>
          </div>
          <div className="Stats-dashboard-item">
            <h2>Accuracy</h2>
            <Gauge value={accuracy} />
          </div>
        </div>
        <h2>Reclassified Recipes</h2>
        <table className="Stats-reclassified">
          <thead>
            <tr>
              <th>Ingredients</th>
              <th>Original Classification</th>
              <th>Reclassification</th>
            </tr>
          </thead>
          <tbody>
            {reclassifications.map((reclassification, index) => (
              <tr key={index}>
                <td>{listIngredients(reclassification.recipe)}</td>
                <td>{classifications[reclassification.original_classification]}</td>
                <td>{classifications[reclassification.reclassification]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>My Saved Recipes</h2>
        <table className="Stats-recipes">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Original Classification</th>
              <th>Reclassification</th>
            </tr>
          </thead>
          <tbody>
            {myRecipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.name}</td>
                <td>{listIngredients(recipe.ingredients)}</td>
                <td>{classifications[recipe.classification]}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>All Saved Recipes</h2>
        <table className="Stats-recipes">
          <thead>
            <tr>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Original Classification</th>
              <th>Reclassification</th>
            </tr>
          </thead>
          <tbody>
            {allRecipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.name}</td>
                <td>{listIngredients(recipe.ingredients)}</td>
                <td>{classifications[recipe.classification]}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stats;
