import { recipes } from "/data/recipes.js";
import { displayCard, displayIngredients, displayFilterIngredients, displayIngredientFilter, closeIngredientFilter } from '/js/display.js'
import { filterCard, filterIngredients, filterTagsIngredients } from "./js/filter.js";

let datasFiltered = [];
let selectedTagIngredients = [];
let searchString = '';
let searchStringIngredients = '';

const searchInputMain = document.getElementById('search');
const searchIngredients = document.getElementById('search_ingredients');
const closeSearchIngredients = document.createElement('a');
const filterContainerIngredients = document.querySelector('.filter_container_ingredients');
const listIngredients = document.getElementById('list_ingredients');
const faAngleDown = document.querySelector('.fa-angle-down');
const openSearchIngredients = document.querySelector('.open_search_ingredients');
const faAngleUp = document.createElement('i');
const filterView = document.querySelector('.filter_view');
const filterViewIngredients = document.createElement('div');

displayCard(recipes);

searchInputMain.addEventListener(('input'), e => {
    searchString = e.target.value.toLowerCase();
    if(searchString.length >= 3 && datasFiltered.length === 0) {
        console.log('boucle 1');
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
    }
    else if (searchString.length >= 3 && datasFiltered.length !== 0) {
        console.log('boucle 2');
        datasFiltered = filterCard(datasFiltered, searchString);
        displayCard(datasFiltered);
    }
    else if (searchString.length === 0 && datasFiltered.length === 0 && selectedTagIngredients.length === 0){
        console.log('boucle 3');
        displayCard(recipes);
    }
})

const openIngredient = e => {
    displayIngredientFilter(e, faAngleDown, faAngleUp, filterContainerIngredients, closeSearchIngredients);

    if(searchString.length >= 3) {
        displayIngredients(datasFiltered);
    }
    else {
        displayIngredients(recipes);
    }
}

searchIngredients.addEventListener(('click'), openIngredient);
openSearchIngredients.addEventListener(('click'), openIngredient);

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
    else if (datasFiltered === []){
        displayFilterIngredients(recipes, searchStringIngredients);
    }
});

listIngredients.addEventListener(('click'), e => {
    const ingredientView = document.createElement('p');

    listIngredients.style.top = '420px';
    faAngleUp.style.top = '360px';
    filterViewIngredients.className = 'view_ing';
    selectedTagIngredients.push(e.target.textContent.toLowerCase());
    ingredientView.textContent = e.target.textContent;
    filterViewIngredients.appendChild(ingredientView);
    filterView.appendChild(filterViewIngredients);
    datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
    displayCard(datasFiltered);
    closeIngredientFilter(e, faAngleDown, faAngleUp, searchIngredients, listIngredients, filterContainerIngredients);
})

closeSearchIngredients.addEventListener(('click'), e => closeIngredientFilter(e, faAngleDown, faAngleUp, searchIngredients, listIngredients, filterContainerIngredients));