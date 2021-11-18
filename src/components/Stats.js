import './Stats.scss';
import { classifications, ingredients } from './App';
import Gauge from './Gauge';
import React from 'react';
import { strings } from './App';

function Stats({ appData, ingredients, classifications, recipes }) {
	const listIngredients = (items) => {
		return items
			.map((item, index) => {
				if (item) return strings[ingredients[index]];
			})
			.filter((item) => item != null)
			.join(', ');
	};

	const getClassificationPercent = (item, index) => {
		let total = 0;
		item.reclassifications.map((value) => (total += value));
		return total > 0 ? Math.round((item.reclassifications[index] / total) * 100) : 0;
	};

	const listReclassifications = (item) => {
		let list = [];
		let total = 0;
		item.reclassifications.map((value) => (total += value));
		item.reclassifications.map((value, index) => {
			if (index != item.original_classification && value > 0) {
				list.push(classifications[index] + ' (' + (value / total) * 100 + '%)');
			}
		});
		return list.join(', ');
	};

	const reclassifications = appData.classroom ? appData.classroom.reclassifications : [];
	const allRecipes = appData.classroom ? appData.classroom.recipes : [];
	const myRecipes = allRecipes.filter((recipe) => {
		return recipe.userId === appData.userId;
	});

	// test
	console.log(appData);

	// Aggregate reclassifications
	const recipeMap = {};
	reclassifications.map((item) => {
		let hashId = item.recipe.join('');
		if (recipeMap[hashId] === undefined) {
			recipeMap[hashId] = {
				recipe: item.recipe,
				original_classification: item.original_classification,
				reclassifications: new Array(classifications.length).fill(0),
			};
		}
		recipeMap[hashId].reclassifications[item.reclassification]++;
	});
	let aggregated = Object.values(recipeMap);

	// Sort most controversial first
	aggregated.sort((a, b) => {
		let percentA = getClassificationPercent(a, a.original_classification);
		let percentB = getClassificationPercent(b, b.original_classification);
		return percentA - percentB;
	});

	// Correct classifications
	const correct = reclassifications.filter((item) => {
		return item.original_classification === item.reclassification;
	});

	// Incorrect classifications
	const incorrect = reclassifications.filter((item) => {
		return item.original_classification !== item.reclassification;
	});

	// Accuracy
	const accuracy = reclassifications.length > 0 ? correct.length / reclassifications.length : 1;

	return (
		<div className='Stats'>
			<div className='Stats-container'>
				<div className='Stats-dashboard'>
					<div className='Stats-dashboard-item'>
						<h2>{strings.totalPredictions}</h2>
						<p>{reclassifications.length}</p>
					</div>
					<div className='Stats-dashboard-item'>
						<h2>{strings.correctClassifications}</h2>
						<p>{correct.length}</p>
					</div>
					<div className='Stats-dashboard-item'>
						<h2>{strings.incorrectClassifications}</h2>
						<p>{incorrect.length}</p>
					</div>
					<div className='Stats-dashboard-item'>
						<h2>{strings.accuracy}</h2>
						<Gauge value={accuracy} />
					</div>
				</div>
				<h2>{strings.reclassifiedRecipes}</h2>
				<table className='Stats-reclassified'>
					<thead>
						<tr>
							<th>{strings.ingredients}</th>
							<th>{strings.originalClassification}</th>
							<th>{strings.reclassification}</th>
						</tr>
					</thead>
					<tbody>
						{aggregated.map((item, i) => (
							<tr key={i}>
								<td>{listIngredients(item.recipe)}</td>
								<td>
									{strings[classifications[item.original_classification]]}{' '}
									{getClassificationPercent(item, item.original_classification) > 0 && <small>({getClassificationPercent(item, item.original_classification)}%)</small>}
								</td>
								<td>
									{classifications.map((classification, index) => {
										let percent = getClassificationPercent(item, index);
										if (index != item.original_classification && percent > 0) {
											return (
												<span key={index}>
													{strings[classification]} <small>({percent}%)</small>
												</span>
											);
										}
									})}
									&nbsp;
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<h2>{strings.mySavedRecipes}</h2>
				<table className='Stats-recipes'>
					<thead>
						<tr>
							<th>{strings.name}</th>
							<th>{strings.ingredients}</th>
							<th>{strings.originalClassification}</th>
							<th>{strings.reclassification}</th>
						</tr>
					</thead>
					<tbody>
						{myRecipes.map((recipe, index) => (
							<tr key={index}>
								<td>{recipe.name}</td>
								<td>{listIngredients(recipe.ingredients)}</td>
								<td>{strings[classifications[recipe.classification]]}</td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
				<h2>{strings.allSavedRecipes}</h2>
				<table className='Stats-recipes'>
					<thead>
						<tr>
							<th>{strings.name}</th>
							<th>{strings.ingredients}</th>
							<th>{strings.originalClassification}</th>
							<th>{strings.reclassification}</th>
						</tr>
					</thead>
					<tbody>
						{allRecipes.map((recipe, index) => (
							<tr key={index}>
								<td>{recipe.name}</td>
								<td>{listIngredients(recipe.ingredients)}</td>
								<td>{strings[classifications[recipe.classification]]}</td>
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
