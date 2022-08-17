import { recipes } from "/data/recipes.js";
import { displayCard, displayIngredients, displayFilterIngredients, displayListIngredient, displayTagIngredient, closeListIngredient, displayAppliance, displayListAppliance, displayTagAppliance, closeListAppliance } from '/js/display.js'
import { filterCard, filterIngredients, filterTagsIngredients, filterAppliance, filterTagAppliance } from "./js/filter.js";

// Main variable
let datasFiltered = [];
let searchString = '';

// Ingredients variable
let searchStringIngredients = '';
let selectedTagIngredients = [];
let linkTagCloseIngs = [];
let tagTextIngs = [];
let viewIng;

// Appliance variable
let searchStringAppliance = '';
let selectedTagAppliance = [];
let linkTagCloseApps = [];
let tagTextApps = [];
let viewApp;

// Main HTML Element
const searchInputMain = document.getElementById('search');
const filterView = document.querySelector('.filter_view');

// Ingredients HTML Element
const searchIngredients = document.getElementById('search_ingredients');
const closeSearchIngredients = document.createElement('a');
const filterContainerIngredients = document.querySelector('.filter_container_ingredients');
const listIngredients = document.getElementById('list_ingredients');
const angleDownIngredients = document.getElementById('angle-down-ingredients');
const openSearchIngredients = document.querySelector('.open_search_ingredients');
const angleUpIngredients = document.createElement('i');
const filterViewIngredients = document.createElement('div');

// Appliance HTML Element
const searchAppliance = document.getElementById('search_appliance');
const closeSearchAppliance = document.createElement('a');
const filterContainerAppliance = document.querySelector('.filter_container_appliance');
const listAppliance = document.getElementById('list_appliance');
const angleDownAppliance = document.getElementById('angle-down-appliance');
const openSearchAppliance = document.querySelector('.open_search_appliance');
const angleUpAppliance = document.createElement('i');
const filterViewAppliance = document.createElement('div');

// Open card recipe
displayCard(recipes);

// Main search function
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
    else if (searchString.length === 0 && datasFiltered.length === 0 && selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0) {
        displayCard(recipes);
    }
    else if (searchString.length < 3 && selectedTagIngredients.length >= 0) {
        datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
        displayCard(datasFiltered);
    }
    closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients);
})

// Ingredients function
const openIngredient = e => {
    displayListIngredient(e, angleDownIngredients, angleUpIngredients, filterContainerIngredients, closeSearchIngredients);

    if (searchString.length >= 3) {
        displayIngredients(datasFiltered);
    }
    else if (datasFiltered.length === 0 && selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0) {
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
    displayTagIngredient(e, listIngredients, angleDownIngredients, filterViewIngredients, selectedTagIngredients, filterView);

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
    viewIng =  document.querySelector('.view_ing');

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

            // if (selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0) {
            //     angleDownIngredients.style.top = '320px';
            //     angleUpIngredients.style.top = '320px';
            //     filterView.style.width = 0;
            //     filterView.style.height = 0;
            //     listIngredients.style.top = '360px';
            //     viewIng.style.display = 'none';
            // }
        }));
    }));

    closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients);
})

closeSearchIngredients.addEventListener(('click'), e => closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, selectedTagAppliance));

// Appliance function
const openAppliance = e => {
    displayListAppliance(e, angleDownAppliance, angleUpAppliance, filterContainerAppliance, closeSearchAppliance);
    if(searchString.length >= 3) {
        displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
    }
    else if (datasFiltered.length === 0 && selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0) {
        displayAppliance(recipes, searchAppliance, listAppliance, searchStringAppliance);
    }
    else {
        displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
    }
    closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, selectedTagAppliance);
}

searchAppliance.addEventListener(('click'), openAppliance);
openSearchAppliance.addEventListener(('click'), openAppliance);

searchAppliance.addEventListener(('input'), e => {
    searchStringAppliance = e.target.value.toLowerCase();
    if(searchString.length >= 3 && searchStringAppliance.length >= 1) {
        datasFiltered = filterAppliance(datasFiltered, searchStringAppliance);
        displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
    }
    else if (searchString.length >= 3) {
        displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
    }
    else if (searchStringAppliance.length >= 1) {
        datasFiltered = filterAppliance(recipes, searchStringAppliance);
        displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
    }
    else if (searchStringAppliance.length === 0) {
        displayAppliance(recipes, searchAppliance, listAppliance, searchStringAppliance);
    }
})

listAppliance.addEventListener(('click'), e => {
    displayTagAppliance(e, listAppliance, angleUpAppliance, filterViewAppliance, selectedTagAppliance, filterView);
    datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
    displayCard(datasFiltered);
    
    if (searchString.length <= 3 && datasFiltered.length === 0) {
        datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
        displayCard(datasFiltered);
    }
    else {
        datasFiltered = filterTagAppliance(datasFiltered, selectedTagAppliance);
        displayCard(datasFiltered);
    }

    linkTagCloseApps = document.querySelectorAll('.close_tag_app');
    tagTextApps = document.querySelectorAll('.tag_text_app');
    viewApp = document.querySelector('.view_app');

    linkTagCloseApps.forEach(linkTagCloseApp => linkTagCloseApp.addEventListener('click', e => {
        tagTextApps.forEach(tagTextApp => tagTextApp.addEventListener('click', e => {
            let text = tagTextApp.innerText.toLowerCase();
            text = text.substring(0, text.length - 1);
            selectedTagAppliance = selectedTagAppliance.filter(item => item !== text);
            tagTextApp.style.display = 'none';

            if (searchString.length < 3 && selectedTagAppliance.length === 0) {
                datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
                displayCard(datasFiltered);
            }
            else if (searchString.length >= 3 && selectedTagAppliance.length === 0) {
                datasFiltered = filterCard(recipes, searchString);
                displayCard(datasFiltered);
            }
            else if (searchString.length < 3 && selectedTagAppliance.length > 0) {
                datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
                displayCard(datasFiltered);
            }

            if (selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0) {
                angleDownAppliance.style.top = "320px";
                angleUpAppliance.style.top = '320px';
                filterView.style.height = 0;
                filterView.style.width = 0;
                listAppliance.style.top = '360px';
                viewApp.style.display = 'none';
            }
        }));
    }));
    closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, selectedTagIngredients);
})

closeSearchAppliance.addEventListener(('click'), e => closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, selectedTagIngredients));