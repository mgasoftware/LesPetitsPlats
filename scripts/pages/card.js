function showRecipes(recipes) {
    const cardShow = document.querySelector('.main_container');
    cardShow.innerHTML = ``;
    recipes.forEach((recipe) => {
        let ingredients = recipe.ingredients;
        let ingredient = '';
        let msg = '';
        Object.values(ingredients).forEach(val => {
            ingredient = val.ingredient;
            if (val.quantity !== undefined && val.unit === undefined) {
                msg += `<div class="card-recipe-ingredients">${ingredient} : <span class="card-recipe-ingredients-unit"> &nbsp;${val.quantity}</span></div>`;
            }
            else if (val.quantity === undefined && val.unit === undefined) {
                msg += `<div class="card-recipe-ingredients">${ingredient}</div>`;
            }
            else if (val.quantity !== undefined && val.unit !== undefined) {
                msg += `<div class="card-recipe-ingredients">${ingredient}: <span class="card-recipe-ingredients-unit"> &nbsp;${val.quantity} ${val.unit}</span></div>`;
            }
        });
        cardShow.innerHTML += `
        <div class="card" style="width: 380px, height: 364px;">
            <img class="card-img-top" src="assets/card_img.png" alt="Card image cap">
            <div class="card-body">
                <div class="card-text">
                    <div class="card-head">
                        <div class="card-recipe-name">${recipe.name}</div>
                        <div class="card-recipe-time">${recipe.time} min</div>
                    </div>
                    <div class="card-main">
                        <div class="card-list-ingredients">${msg}</div>
                        <div class="card-recipe-description">${recipe.description}</div>
                    </div>
                </div>
            </div>
        </div>`
    });
}

function getRecipes() {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const searchString = e.target.value.toLowerCase();
        if (searchString.length >= 3) {
            let recipesFiltred = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchString)
                || recipe.description.toLowerCase().includes(searchString)
                || recipe.ingredients.find(el => {
                    return (el.ingredient).toLowerCase().includes(searchString);
                }));
            showRecipes(recipesFiltred);
        }
        else {
            showRecipes(recipes);
        }
    })
    showRecipes(recipes);
}

getRecipes();