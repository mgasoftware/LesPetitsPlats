import { recipes } from "/data/recipes.js";
import { displayCard, displayIngredients, displayFilterIngredients, displayListIngredient, displayTagIngredient, closeListIngredient } from '/js/display.js'
import { filterCard, filterIngredients, filterTagsIngredients } from "./js/filter.js";

let datasFiltered = [];
let selectedTagIngredients = [];
let searchString = '';
let searchStringIngredients = '';
let linkTagCloseIngs = [];
let tagTextIngs = [];

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
    if (searchString.length >= 3 && datasFiltered.length === 0 && selectedTagIngredients.length === 0) {
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
    }
    else if (searchString.length >= 3 && datasFiltered.length !== 0) {
        datasFiltered = filterCard(datasFiltered, searchString);
        displayCard(datasFiltered);
    }
    else if (searchString.length === 0 && datasFiltered.length === 0 && selectedTagIngredients.length === 0) {
        displayCard(recipes);
    }
    else if (searchString.length < 3 && selectedTagIngredients.length >= 0) {
        datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
        displayCard(datasFiltered);
    }
})

const openIngredient = e => {
    displayListIngredient(e, faAngleDown, faAngleUp, filterContainerIngredients, closeSearchIngredients);

    if (searchString.length >= 3) {
        displayIngredients(datasFiltered);
    }
    else if (datasFiltered.length === 0 && selectedTagIngredients.length === 0) {
        displayIngredients(recipes);
    }
    else {
        displayIngredients(datasFiltered);
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
    else if (datasFiltered.length === 0 && selectedTagIngredients.length === 0) {
        displayFilterIngredients(recipes, searchStringIngredients);
    }
});

listIngredients.addEventListener(('click'), e => {
    displayTagIngredient(e, listIngredients, faAngleUp, filterViewIngredients, selectedTagIngredients, filterView);

    if (searchString.length <= 3 && datasFiltered.length === 0) {
        datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
        displayCard(datasFiltered);
    }
    else {
        datasFiltered = filterTagsIngredients(datasFiltered, selectedTagIngredients);
        displayCard(datasFiltered);
    }

    linkTagCloseIngs = document.querySelectorAll('.close_tag_ing');
    tagTextIngs = document.querySelectorAll('.tag_text_ing');

    linkTagCloseIngs.forEach(linkTagCloseIng => linkTagCloseIng.addEventListener('click', e => {
        tagTextIngs.forEach(tagTextIng => tagTextIng.addEventListener('click', e => {
            let text = tagTextIng.innerText.toLowerCase();
            text = text.substring(0, text.length - 1);
            selectedTagIngredients = selectedTagIngredients.filter(item => item !== text);
            tagTextIng.style.display = 'none';

            if (searchString.length < 3 && selectedTagIngredients.length === 0) {
                datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
                displayCard(datasFiltered);
            }
            else if (searchString.length >= 3 && selectedTagIngredients.length === 0) {
                datasFiltered = filterCard(recipes, searchString);
                displayCard(datasFiltered);
            }
            else if (searchString.length < 3 && selectedTagIngredients.length > 0) {
                datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
                displayCard(datasFiltered);
            }


            if (selectedTagIngredients.length === 0) {
                faAngleDown.style.top = '320px';
                filterView.style.height = 0;
                listIngredients.style.top = '360px';
            }
        }));
    }));

    closeListIngredient(e, faAngleDown, faAngleUp, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients);
})

closeSearchIngredients.addEventListener(('click'), e => closeListIngredient(e, faAngleDown, faAngleUp, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients));