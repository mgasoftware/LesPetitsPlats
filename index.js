import { recipes } from "/data/recipes.js";
import { displayCard, displayIngredients, displayFilterIngredients } from '/js/display.js'
import { filterCard, filterIngredients } from "./js/filter.js";

let datasFiltered = [];

let searchString = '';
let searchStringIngredients = '';
let selectedIngredient = '';
const searchInputMain = document.getElementById('search');
const searchIngredients = document.getElementById('search_ingredients');
const closeSearchIngredients = document.createElement('a');
const filterContainerIngredients = document.querySelector('.filter_container_ingredients');
const listIngredients = document.getElementById('list_ingredients');
const faAngleDown = document.querySelector('.fa-angle-down');
const faAngleUp = document.createElement('i');
const filterViewIngredients = document.querySelector('.filter_view_ingredients');

displayCard(recipes);

searchInputMain.addEventListener(('input'), e => {
    searchString = e.target.value.toLowerCase();
    if (searchString.length >= 3) {
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
    }
    else {
        displayCard(recipes);
    }
})

searchIngredients.addEventListener(('click'), e => {
    faAngleDown.style.display = 'none';
    faAngleUp.setAttribute('class', 'fa-solid fa-angle-up');
    filterContainerIngredients.style.width = '667px';
    closeSearchIngredients.setAttribute('class', 'close_search_ingredients');

    closeSearchIngredients.appendChild(faAngleUp);
    filterContainerIngredients.appendChild(closeSearchIngredients);

    if(searchString.length >= 3) {
        displayIngredients(datasFiltered);
    }
    else {
        displayIngredients(recipes);
    }
});

searchIngredients.addEventListener(('input'), e => {
    searchStringIngredients = e.target.value.toLowerCase();
    if (searchString.length >= 3 && searchStringIngredients.length >= 1) {
        datasFiltered = filterIngredients(datasFiltered, searchStringIngredients);
        displayFilterIngredients(datasFiltered, searchStringIngredients);
    }
    else if (searchString.length >= 3) {
        displayFilterIngredients(datasFiltered, searchStringIngredients);
    }
    else if (searchStringIngredients.length >= 1) {
        datasFiltered = filterIngredients(recipes, searchStringIngredients);
        displayFilterIngredients(datasFiltered, searchStringIngredients);
    }
    else {
        displayFilterIngredients(recipes, searchStringIngredients);
    }
});

listIngredients.addEventListener(('click'), e => {
    filterViewIngredients.style.display = 'flex';
    const ingredientView = document.createElement('p');
    selectedIngredient = e.target.textContent;
    ingredientView.textContent = selectedIngredient;
    filterViewIngredients.appendChild(ingredientView);
})

const closeIngredients = e => {
    faAngleDown.style.display = 'block';
    searchIngredients.setAttribute('class', 'filter_search ingredients');
    searchIngredients.setAttribute('placeholder', 'Ingredients');
    listIngredients.innerHTML = ``;
    filterContainerIngredients.style.width = 'auto';
}

closeSearchIngredients.addEventListener(('click'), closeIngredients);