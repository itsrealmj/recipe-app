let currentPage = 1
let rows = 3
let listElement = document.querySelector('.main-container')
let containerBtns = document.querySelector('.container-btn')


document.querySelector("form").addEventListener('submit', function(event) {
	event.preventDefault()
	const recipeName = document.querySelector(".input-field")

	fetch(`https://mjcorsproxy.herokuapp.com/https://api.edamam.com/search?q=${recipeName.value}&app_id=0fc074b5&app_key=fee7d11a00a66e9dcfa4ca127bed9bc4`)
	.then(response => {
		return response.json()
	}).then(response => {
		 storeData(response) 
	})
	recipeName.value = ""
})



function storeData(response) {
	const recipeArray = response.hits
	window.localStorage.setItem("recipeArray", JSON.stringify(recipeArray));

	displayRecipes(recipeArray, listElement, rows, currentPage)
	setUpPagination(response, containerBtns, rows)
}


function displayRecipes(response, wrapper, rowsPerpage, page) {

    if ( localStorage !== null) {
 	    let getRecipeData = localStorage.getItem("recipeArray")
 	    	getRecipeData = JSON.parse(getRecipeData)

			wrapper.innerHTML = "";
		    page --

		    let start = rowsPerpage * page
		    let end = start + rowsPerpage
		    let paginatedItems = getRecipeData.slice(start, end)

		    

		paginatedItems.map(item => {
			const calcium = item.recipe.totalNutrients.CA.label
			const kcal = item.recipe.totalNutrients.ENERC_KCAL.label
			const K = item.recipe.totalNutrients.K.label

			const calciumQty = item.recipe.totalNutrients.CA.quantity
			const kcalQty = item.recipe.totalNutrients.ENERC_KCAL.quantity
			const KQty = item.recipe.totalNutrients.K.quantity

			const calciumUnit = item.recipe.totalNutrients.CA.unit
			const kcalUnit = item.recipe.totalNutrients.ENERC_KCAL.unit
			const KUnit = item.recipe.totalNutrients.K.unit

			let	html = `
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
								<p href="./recipe-details/recipe-details.html" class="more-details">More details ...</p>
							</ul>
						</figcaption>

					</section> `

			wrapper.innerHTML += html

			window.localStorage.setItem("paginatedItems", JSON.stringify(paginatedItems))
		})
	}
}

function retainData(wrapper) {
	wrapper.innerHTML = ""

	if (localStorage !== null) {
		let paginatedItems = localStorage.getItem("paginatedItems")
			paginatedItems = JSON.parse(paginatedItems)

			paginatedItems.map(item => {
			const calcium = item.recipe.totalNutrients.CA.label
			const kcal = item.recipe.totalNutrients.ENERC_KCAL.label
			const K = item.recipe.totalNutrients.K.label

			const calciumQty = item.recipe.totalNutrients.CA.quantity
			const kcalQty = item.recipe.totalNutrients.ENERC_KCAL.quantity
			const KQty = item.recipe.totalNutrients.K.quantity

			const calciumUnit = item.recipe.totalNutrients.CA.unit
			const kcalUnit = item.recipe.totalNutrients.ENERC_KCAL.unit
			const KUnit = item.recipe.totalNutrients.K.unit

			let	html = `
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
								<p href="./recipe-details/recipe-details.html" class="more-details">More details ...</p>
							
							</ul>
							
						</figcaption>

					</section> `
			wrapper.innerHTML += html
			})
		
	}
}
retainData(listElement)


function setUpPagination(arrayItems, wrapper, rowsPerpage) {
	let response = arrayItems.hits
    wrapper.innerHTML = ""

    let pageCount = Math.ceil(response.length / rowsPerpage)

    for (let i = 1; i < pageCount + 1; i++) {
        let btn = paginationBtn(i, response)
        wrapper.appendChild(btn)
    }
    
}

function paginationBtn(page, items) {

    let button = document.createElement('button')
    button.innerText = page

    button.addEventListener('click', function() {
        currentPage = page
        displayRecipes(items, listElement, rows, currentPage)
    })
    return button
        
}



