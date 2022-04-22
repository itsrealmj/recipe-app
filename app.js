
document.querySelector("form").addEventListener('submit', function(event) {
	event.preventDefault()
	const recipeName = document.querySelector(".input-field")

	fetch(`https://mjcorsproxy.herokuapp.com/https://api.edamam.com/search?q=${recipeName.value}&app_id=0fc074b5&app_key=fee7d11a00a66e9dcfa4ca127bed9bc4`)
	.then(response => {
		return response.json()
	}).then(response => {
		// console.log(response)
		 displayRecipes(response)
		 paginationDisplayBtn(response)
	})

	recipeName.value = ""
})

function displayRecipes(response) {
	const recipeArray = response.hits

	recipeArray.map(item => {
			const calcium = item.recipe.totalNutrients.CA.label
			const kcal = item.recipe.totalNutrients.ENERC_KCAL.label
			const K = item.recipe.totalNutrients.K.label

			const calciumQty = item.recipe.totalNutrients.CA.quantity
			const kcalQty = item.recipe.totalNutrients.ENERC_KCAL.quantity
			const KQty = item.recipe.totalNutrients.K.quantity

			const calciumUnit = item.recipe.totalNutrients.CA.unit
			const kcalUnit = item.recipe.totalNutrients.ENERC_KCAL.unit
			const KUnit = item.recipe.totalNutrients.K.unit

			let html = `
				<section class="card-container">
					<figure>
						<h5>${item.recipe.label}</h5>
						<img src="${item.recipe.image}">
					</figure>
					<figcaption>
						<ul>
							<li>🍚 <span class="kcal">${kcal} </span>: ${Math.round(kcalQty)} ${kcalUnit}</li>
							<li>🥦 <span class="calcium">${calcium}</span> : ${Math.round(calciumQty)} ${calciumUnit}</li>
							<li>🍌 <span class="K">${K}</span> : ${Math.round(KQty)} ${KUnit}</li>
							<a href="./recipe-details/recipe-details.html">More details...</a>
						</ul>
					</figcaption>

				</section> `

			document.querySelector('.main-container').innerHTML += html
	})
	
}

function paginationDisplayBtn(response) {
	const recipeArray = response.hits
	recipeArray.map(item => {
		document.querySelector('.btn-container').innerHTML += ` <button class="pageBtn">${item.recipe.yield}</button> `
	})	
}

