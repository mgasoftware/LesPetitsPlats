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
    angleDownIngredients.style.top = '370px';
    filterViewIngredients.style.display = 'flex';
    filterViewIngredients.className = 'view_ing';

    if(selectedTagIngredients.indexOf(e.target.textContent.toLowerCase()) === - 1) {
        selectedTagIngredients.push(e.target.textContent.toLowerCase());
    
        filterViewIngredients.innerHTML += `    <p class='tag_text_ing'>${e.target.textContent}
                                                    <a class="close_tag_ing">
                                                        <i class="fa-regular fa-circle-xmark"></i>
                                                    </a>
                                                </p>`
        filterView.appendChild(filterViewIngredients);
    }
}

export function closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance, angleDownUstensils) {
    angleDownAppliance.style.left = '430px';
    angleDownUstensils.style.left = '620px';
    angleDownIngredients.style.display = 'block';

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

export function displayTagAppliance(e, listAppliance, angleDownAppliance, filterViewAppliance, selectedTagAppliance, filterView) {
    filterView.style.width = '100%';
    filterView.style.height = '46.5px';
    listAppliance.style.top = '410px';
    angleDownAppliance.style.top = '370px';
    filterViewAppliance.style.display = 'flex';
    filterViewAppliance.className = 'view_app';

    if(selectedTagAppliance.indexOf(e.target.textContent.toLowerCase()) === -1) {
        selectedTagAppliance.push(e.target.textContent.toLowerCase());
    
        filterViewAppliance.innerHTML += `  <p class='tag_text_app'>${e.target.textContent}
                                                <a class="close_tag_app">
                                                    <i class="fa-regular fa-circle-xmark"></i>
                                                </a>
                                            </p>`
        filterView.appendChild(filterViewAppliance);
    }
}

export function closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils) {
    angleDownAppliance.style.display = 'block';
    angleDownUstensils.style.left = '620px'

    angleUpAppliance.style.display = 'none';
    searchAppliance.setAttribute('class', 'filter_search appliance');
    searchAppliance.setAttribute('placeholder', 'Appareils');
    searchAppliance.value = '';
    listAppliance.innerHTML = ``;
    filterContainerAppliance.style.width = 'auto';
}

//Ustenils display function
export function displayUstensils(dataUstensils, searchUstensils, listUstensils, searchStringUstensils) {
    let tableauUstensils = [];

    searchUstensils.setAttribute('class', 'filter_search_list ustensils');
    searchUstensils.setAttribute('placeholder', 'Rechercher un ustensils');
    listUstensils.innerHTML = ``;

    dataUstensils.forEach((data) => {
        let ustensils = data.ustensils;
        ustensils = ustensils.filter(ustensilsFilter => ustensilsFilter.toLowerCase().includes(searchStringUstensils));
        Object.values(ustensils).forEach(val => {
            tableauUstensils.push(val);
        })
    })

    tableauUstensils = Array.from(new Set(tableauUstensils));
    tableauUstensils.forEach((ustensils) => {
        listUstensils.innerHTML += `<div><a class="link_ustensils"><p>${ustensils}</p><a></div>`
    });
}

export function displayListUstensils(e, angleDownUstensils, angleUpUstensils, filterContainerUstensils, closeSearchUstensils) {
    angleDownUstensils.style.display = 'none';
    angleUpUstensils.style.display = 'block';
    angleUpUstensils.setAttribute('class', 'fa-solid fa-angle-up');
    angleUpUstensils.setAttribute('id', 'angle-up-ustensils');
    filterContainerUstensils.style.width = '667px';
    closeSearchUstensils.setAttribute('class', 'close_search_ustensils');

    closeSearchUstensils.appendChild(angleUpUstensils);
    filterContainerUstensils.appendChild(closeSearchUstensils);
}

export function displayTagUstensils(e, listUstensils, angleUpUstensils, filterViewUstensils, selectedTagUstensils, filterView) {
    filterView.style.width = '100%';
    filterView.style.height = '46.5px';
    listUstensils.style.top = '410px';
    angleUpUstensils.style.display = 'block';
    angleUpUstensils.style.top = '320px';
    filterViewUstensils.style.display = 'flex';
    filterViewUstensils.className = 'view_usts';

    if(selectedTagUstensils.indexOf(e.target.textContent.toLowerCase()) === -1) {
    selectedTagUstensils.push(e.target.textContent.toLowerCase());

    filterViewUstensils.innerHTML += `  <p class='tag_text_usts'>${e.target.textContent}
                                            <a class="close_tag_usts">
                                                <i class="fa-regular fa-circle-xmark"></i>
                                            </a>
                                        </p>`

    filterView.appendChild(filterViewUstensils);
    }
}

export function closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils) {
    angleDownUstensils.style.display = 'block';

    angleUpUstensils.style.display = 'none';
    searchUstensils.setAttribute('class', 'filter_search ustensils');
    searchUstensils.setAttribute('placeholder', 'Ustensiles');
    searchUstensils.value = '';
    listUstensils.innerHTML = ``;
    filterContainerUstensils.style.width = 'auto';
}

export function displayError(errorView) {
    const main = document.querySelector('main');
    const errorText = document.createElement('h1');

    errorText.style.fontSize = '20px';
    errorText.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    errorView.appendChild(errorText);
    main.appendChild(errorView)
}