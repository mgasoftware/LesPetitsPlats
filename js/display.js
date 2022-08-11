export function displayCard(datas) {
    const cardShow = document.querySelector('.main_container');
    cardShow.innerHTML = ``;
    datas.forEach((data) => {
        let ingredients = data.ingredients;
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
                        <div class="card-recipe-name">${data.name}</div>
                        <div class="card-recipe-time">${data.time} min</div>
                    </div>
                    <div class="card-main">
                        <div class="card-list-ingredients">${msg}</div>
                        <div class="card-recipe-description">${data.description}</div>
                    </div>
                </div>
            </div>
        </div>`
    });
}

export function displayIngredients(dataIngredients) {
    const searchIngredients = document.getElementById('search_ingredients');
    const listIngredients = document.getElementById('list_ingredients');
    let tableauIngredient = [];

    searchIngredients.setAttribute('class', 'filter_search_list ingredients');
    searchIngredients.setAttribute('placeholder', 'Rechercher un ingredients');
    listIngredients.innerHTML = ``;

    dataIngredients.forEach((data) => {
        let ingredients = data.ingredients;
        Object.values(ingredients).forEach(val => {
            tableauIngredient.push(val.ingredient);
        })
    })
    tableauIngredient = Array.from(new Set(tableauIngredient));
    tableauIngredient.forEach((ingredient) => {
        listIngredients.innerHTML += `<div><a class="link_ingredients"><p>${ingredient}</p><a></div>`;
    });

}

export function displayFilterIngredients(dataIngredients, e) {
    const listIngredients = document.getElementById('list_ingredients');
    let tableauIngredient = [];

    listIngredients.innerHTML = ``;

    dataIngredients.forEach((data) => {
        let ingredients = data.ingredients;
        ingredients = ingredients.filter(ingredientsFilter => ingredientsFilter.ingredient.toLowerCase().includes(e));
        Object.values(ingredients).forEach(val => {
            tableauIngredient.push(val.ingredient);
        });
    });

    tableauIngredient = Array.from(new Set(tableauIngredient));
    tableauIngredient.forEach((ingredient) => {
        listIngredients.innerHTML += `<div><a class="link_ingredients"><p>${ingredient}</p><a></div>`;
    });

}

export function displayIngredientFilter(e, faAngleDown, faAngleUp, filterContainerIngredients, closeSearchIngredients) {
    faAngleDown.style.display = 'none';
    faAngleUp.style.display = 'block';
    faAngleUp.setAttribute('class', 'fa-solid fa-angle-up');
    filterContainerIngredients.style.width = '667px';
    closeSearchIngredients.setAttribute('class', 'close_search_ingredients');

    closeSearchIngredients.appendChild(faAngleUp);
    filterContainerIngredients.appendChild(closeSearchIngredients);
}

export function closeIngredientFilter(e, faAngleDown, faAngleUp, searchIngredients, listIngredients, filterContainerIngredients) {
    faAngleDown.style.display = 'flex';
    faAngleDown.style.top = '375px';
    faAngleUp.style.display = 'none';
    searchIngredients.setAttribute('class', 'filter_search ingredients');
    searchIngredients.setAttribute('placeholder', 'Ingredients');
    searchIngredients.value = '';
    listIngredients.innerHTML = ``;
    filterContainerIngredients.style.width = 'auto';
}