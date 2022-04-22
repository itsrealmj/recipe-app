
document.querySelector("form").addEventListener('submit', function(event) {
	event.preventDefault()
	const recipeName = document.querySelector(".input-field")

	fetch(`https://mjcorsproxy.herokuapp.com/https://api.edamam.com/search?q=${recipeName.value}&app_id=0fc074b5&app_key=fee7d11a00a66e9dcfa4ca127bed9bc4`)
	.then(response => {
		return response.json()
	}).then(response => {
		// console.log(response)
		 displayRecipes(response, listElement, rows, currentPage)
		 setUpPagination(response, containerBtns, rows)
	})

	recipeName.value = ""
})

let currentPage = 1
let rows = 3
let listElement = document.querySelector('.main-container')
let containerBtns = document.querySelector('.container-btn')
// display(array, listElement, rows, currentPage )
function displayRecipes(response, wrapper, rowsPerpage, page) {
	let recipeArray = response.hits

	wrapper.innerHTML = ""
    page --

    let start = rowsPerpage * page
    let end = start + rowsPerpage
    let paginatedItems = recipeArray.slice(start, end)
    console.log(paginatedItems)

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
						<a href="./recipe-details/recipe-details.html">More details...</a>
					</ul>
				</figcaption>

			</section> `

		wrapper.innerHTML += html
})	
}

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

    // if (currentPage === page) button.classList.add('active')
    button.addEventListener('click', function() {
        currentPage = page
        displayRecipes(items, listElement, rows, currentPage)
    })
    return button
        
}



