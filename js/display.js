// Main display card function
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

// Ingredients display function
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

export function displayListIngredient(e, angleDownIngredients, angleUpIngredients, filterContainerIngredients, closeSearchIngredients) {
    angleDownIngredients.style.display = 'none';
    angleUpIngredients.style.display = 'block';
    angleUpIngredients.setAttribute('class', 'fa-solid fa-angle-up');
    angleUpIngredients.setAttribute('id', 'angle-up-ingredients');
    filterContainerIngredients.style.width = '667px';
    closeSearchIngredients.setAttribute('class', 'close_search_ingredients');

    closeSearchIngredients.appendChild(angleUpIngredients);
    filterContainerIngredients.appendChild(closeSearchIngredients);
}

export function displayTagIngredient(e, listIngredients, angleDownIngredients, filterViewIngredients, selectedTagIngredients, filterView) {
    filterView.style.height = '46.5px';
    filterView.style.width = '100%';
    listIngredients.style.top = '410px';
    angleDownIngredients.style.top = '360px';
    filterViewIngredients.style.display = 'flex';
    filterViewIngredients.className = 'view_ing';
    selectedTagIngredients.push(e.target.textContent.toLowerCase());

    filterViewIngredients.innerHTML += `    <p class='tag_text_ing'>${e.target.textContent}
                                                <a class="close_tag_ing">
                                                    <i class="fa-regular fa-circle-xmark"></i>
                                                </a>
                                            </p>`
    filterView.appendChild(filterViewIngredients);
}

export function closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance) {
    angleDownAppliance.style.left = '430px';
    angleDownIngredients.style.display = 'block';
    if (selectedTagIngredients.length === 0 || typeof (selectedTagIngredients) === 'undefined') {
        angleDownIngredients.style.top = '320px';
    }
    else {
        angleDownIngredients.style.top = '370px';
    }
    angleUpIngredients.style.display = 'none';
    searchIngredients.setAttribute('class', 'filter_search ingredients');
    searchIngredients.setAttribute('placeholder', 'Ingredients');
    searchIngredients.value = '';
    listIngredients.innerHTML = ``;
    filterContainerIngredients.style.width = 'auto';
}

// Appliance display function
export function displayAppliance(dataAppliance, searchAppliance, listAppliance, searchStringAppliance) {
    let tableauAppliance = [];
    let appliance = [];

    searchAppliance.setAttribute('class', 'filter_search_list appliance');
    searchAppliance.setAttribute('placeholder', 'Rechercher un appareils');
    listAppliance.innerHTML = ``;

    dataAppliance.forEach((data) => {
        appliance.push(data.appliance);
    })

    appliance = appliance.filter(applianceFilter => applianceFilter.toLowerCase().includes(searchStringAppliance));
    tableauAppliance = Array.from(new Set(appliance))
    tableauAppliance.forEach((appliance) => {
        listAppliance.innerHTML += `<div><a class="link_appliance"><p>${appliance}</p><a></div>`;
    })
}

export function displayListAppliance(e, angleDownAppliance, angleUpAppliance, filterContainerAppliance, closeSearchAppliance) {
    angleDownAppliance.style.display = 'none';
    angleUpAppliance.style.display = 'block';
    angleUpAppliance.setAttribute('class', 'fa-solid fa-angle-up');
    angleUpAppliance.setAttribute('id', 'angle-up-appliance');
    filterContainerAppliance.style.width = '667px';
    closeSearchAppliance.setAttribute('class', 'close_search_appliance');

    closeSearchAppliance.appendChild(angleUpAppliance);
    filterContainerAppliance.appendChild(closeSearchAppliance);
}

export function displayTagAppliance(e, listAppliance, angleUpAppliance, filterViewAppliance, selectedTagAppliance, filterView) {
    filterView.style.width = '100%';
    filterView.style.height = '46.5px';
    listAppliance.style.top = '410px';
    angleUpAppliance.style.top = '360px';
    filterViewAppliance.style.display = 'flex';
    filterViewAppliance.className = 'view_app';
    selectedTagAppliance.push(e.target.textContent.toLowerCase());

    filterViewAppliance.innerHTML += `  <p class='tag_text_app'>${e.target.textContent}
                                            <a class="close_tag_app">
                                                <i class="fa-regular fa-circle-xmark"></i>
                                            </a>
                                        </p>`
    filterView.appendChild(filterViewAppliance);
}

export function closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance) {
    angleDownAppliance.style.display = 'block';
    if(selectedTagAppliance.length === 0 || typeof (selectedTagAppliance) === 'undefined') {
        angleDownAppliance.style.top = '320px';
    }
    else {
        angleDownAppliance.style.top = '370px';
    }
    angleUpAppliance.style.display = 'none';
    searchAppliance.setAttribute('class', 'filter_search appliance');
    searchAppliance.setAttribute('placeholder', 'Appareils');
    searchAppliance.value = '';
    listAppliance.innerHTML = ``;
    filterContainerAppliance.style.width = 'auto';
}