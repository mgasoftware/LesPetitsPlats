import recipes from './data/recipes.js';
import {
  displayCard, displayIngredients,
  displayFilterIngredients, displayListIngredient, displayTagIngredient, closeListIngredient,
  displayAppliance, displayListAppliance, displayTagAppliance, closeListAppliance,
  displayUstensils, displayListUstensils, displayTagUstensils, closeListUstensils, displayError,
} from './js/display.js';
import {
  filterCard, filterIngredients, filterTagsIngredients, filterAppliance,
  filterTagAppliance, filterUstensils, filterTagUstensils,
} from './js/filter.js';

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

// Ustensils variable
let searchStringUstensils = '';
let selectedTagUstensils = [];
let linkTagCloseUsts = [];
let tagTextUsts = [];
let viewUsts;

// Main HTML Element
const searchInputMain = document.getElementById('search');
const filterView = document.querySelector('.filter_view');
const mainContainer = document.querySelector('.main_container');
const errorView = document.querySelector('.error_view');

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

// Ustensils HTML Element
const searchUstensils = document.getElementById('search_ustensils');
const closeSearchUstensils = document.createElement('a');
const filterContainerUstensils = document.querySelector('.filter_container_ustensils');
const listUstensils = document.getElementById('list_ustensils');
const angleDownUstensils = document.getElementById('angle-down-ustensils');
const openSearchUstensils = document.querySelector('.open_search_ustensils');
const angleUpUstensils = document.createElement('i');
const filterViewUstensils = document.createElement('div');

// Open card recipe
displayCard(recipes);

// Main search function
searchInputMain.addEventListener(('click'), (e) => {
  closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils);
  closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils);
  closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance, angleDownUstensils);
});
searchInputMain.addEventListener(('input'), (e) => {
  searchString = e.target.value.toLowerCase();
  if (searchString.length >= 3 && datasFiltered.length === 0 && selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0 && selectedTagUstensils.length === 0) {
    datasFiltered = filterCard(recipes, searchString);
    displayCard(datasFiltered);
  } else if (searchString.length >= 3 && datasFiltered.length !== 0) {
    datasFiltered = filterCard(recipes, searchString);
    datasFiltered = filterIngredients(datasFiltered, selectedTagIngredients);
    datasFiltered = filterAppliance(datasFiltered, selectedTagAppliance);
    datasFiltered = filterUstensils(datasFiltered, selectedTagUstensils);
    displayCard(datasFiltered);
  } else if (searchString.length < 3 && datasFiltered.length !== 0) {
    datasFiltered = filterIngredients(recipes, selectedTagIngredients);
    datasFiltered = filterAppliance(datasFiltered, selectedTagAppliance);
    datasFiltered = filterUstensils(datasFiltered, selectedTagUstensils);
    displayCard(datasFiltered);
  } else if (searchString.length < 3 && datasFiltered.length === 0) {
    datasFiltered = filterIngredients(recipes, selectedTagIngredients);
    datasFiltered = filterAppliance(datasFiltered, selectedTagAppliance);
    datasFiltered = filterUstensils(datasFiltered, selectedTagUstensils);
    displayCard(datasFiltered);
  } else if (selectedTagIngredients.length > 0 || selectedTagAppliance.length > 0 || selectedTagUstensils.length > 0) {
    datasFiltered = filterCard(recipes, searchString);
    datasFiltered = filterIngredients(datasFiltered, selectedTagIngredients);
    datasFiltered = filterAppliance(datasFiltered, selectedTagAppliance);
    datasFiltered = filterUstensils(datasFiltered, selectedTagUstensils);
    displayCard(datasFiltered);
  } else if (searchString.length < 3 && selectedTagIngredients.length > 0 && selectedTagAppliance.length > 0 && selectedTagUstensils.length > 0) {
    datasFiltered = filterCard(datasFiltered, searchString);
    displayCard(datasFiltered);
  }

  if (mainContainer.innerHTML === '' && errorView.innerHTML === '') {
    displayError(errorView);
  } else if (mainContainer.innerHTML !== '') {
    errorView.innerHTML = '';
  }
});

// Function who reset the display when change of view applied
function mainResetDisplay() {
  angleDownIngredients.style.top = '320px';
  angleUpIngredients.style.top = '320px';
  filterView.style.width = 0;
  filterView.style.height = 0;
  listIngredients.style.top = '360px';
  angleDownAppliance.style.top = '320px';
  angleUpAppliance.style.top = '320px';
  listAppliance.style.top = '360px';
  angleDownUstensils.style.top = '320px';
  angleUpUstensils.style.top = '320px';
  listUstensils.style.top = '360px';
}
// INGREDIENTS

// Fuction open ingredients
const openIngredient = (e) => {
  displayListIngredient(e, angleDownIngredients, angleUpIngredients, filterContainerIngredients, closeSearchIngredients);

  if (searchString.length >= 3) {
    displayIngredients(datasFiltered);
  } else if (datasFiltered.length === 0 && selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0) {
    displayIngredients(recipes);
  } else {
    displayIngredients(datasFiltered);
  }
  closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils);
  closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils);

  angleDownAppliance.style.left = '900px';
  angleDownUstensils.style.left = '1100px';
};

searchIngredients.addEventListener(('click'), openIngredient);
openSearchIngredients.addEventListener(('click'), openIngredient);

// Function search ingredient in it list
searchIngredients.addEventListener(('input'), (e) => {
  searchStringIngredients = e.target.value.toLowerCase();
  if (searchString.length >= 3 && searchStringIngredients.length >= 1) {
    datasFiltered = filterIngredients(datasFiltered, searchStringIngredients);
    displayFilterIngredients(datasFiltered, searchStringIngredients);
  } else if (searchString.length >= 3) {
    displayFilterIngredients(datasFiltered, searchStringIngredients);
  } else if (searchStringIngredients.length >= 1) {
    datasFiltered = filterIngredients(recipes, searchStringIngredients);
    displayFilterIngredients(datasFiltered, searchStringIngredients);
  } else if (datasFiltered.length === 0 && selectedTagIngredients.length === 0) {
    displayFilterIngredients(recipes, searchStringIngredients);
  }
});

// Function who take the ingredients select and display it to the dom
listIngredients.addEventListener(('click'), (e) => {
  displayTagIngredient(e, listIngredients, angleDownIngredients, filterViewIngredients, selectedTagIngredients, filterView);

  if (searchString.length <= 3 && datasFiltered.length === 0) {
    datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
    displayCard(datasFiltered);
  } else {
    datasFiltered = filterTagsIngredients(datasFiltered, selectedTagIngredients);
    displayCard(datasFiltered);
  }

  linkTagCloseIngs = document.querySelectorAll('.close_tag_ing');
  tagTextIngs = document.querySelectorAll('.tag_text_ing');
  viewIng = document.querySelector('.view_ing');

  angleDownIngredients.style.top = '370px';
  angleUpIngredients.style.top = '370px';
  angleDownAppliance.style.top = '370px';
  angleUpAppliance.style.top = '370px';
  angleDownUstensils.style.top = '370px';
  angleUpUstensils.style.top = '370px';
  listAppliance.style.top = '410px';
  listUstensils.style.top = '410px';

  // Function who close the ingredients selected
  linkTagCloseIngs.forEach((linkTagCloseIng) => linkTagCloseIng.addEventListener('click', (e) => {
    tagTextIngs.forEach((tagTextIng) => tagTextIng.addEventListener('click', (e) => {
      let text = tagTextIng.innerText.toLowerCase();
      text = text.substring(0, text.length - 1);
      selectedTagIngredients = selectedTagIngredients.filter((item) => item !== text);
      tagTextIng.style.display = 'none';

      if (searchString.length < 3 && selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0 && selectedTagUstensils.length === 0) {
        datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
        displayCard(datasFiltered);
      } else if (searchString.length >= 3 && selectedTagIngredients.length === 0) {
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
      } else {
        datasFiltered = filterTagsIngredients(recipes, selectedTagIngredients);
        datasFiltered = filterTagAppliance(datasFiltered, selectedTagAppliance);
        datasFiltered = filterTagUstensils(datasFiltered, selectedTagUstensils);
        displayCard(datasFiltered);
      }

      if (selectedTagIngredients.length === 0) {
        viewIng.style.display = 'none';
      }

      if (selectedTagIngredients.length === 0 && selectedTagAppliance.length === 0 && selectedTagUstensils.length === 0) {
        mainResetDisplay();
      }
    }));
  }));
  closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance, angleDownUstensils);
});

closeSearchIngredients.addEventListener(('click'), (e) => closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance, angleDownUstensils));

// APPLIANCE

// Function open appliance
const openAppliance = (e) => {
  displayListAppliance(e, angleDownAppliance, angleUpAppliance, filterContainerAppliance, closeSearchAppliance);
  if (searchString.length >= 3) {
    displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
  } else if (datasFiltered.length === 0 && selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0) {
    displayAppliance(recipes, searchAppliance, listAppliance, searchStringAppliance);
  } else {
    displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
  }
  closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils);
  closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagAppliance, angleDownAppliance, angleDownUstensils);
  angleDownUstensils.style.left = '1100px';
};

searchAppliance.addEventListener(('click'), openAppliance);
openSearchAppliance.addEventListener(('click'), openAppliance);

// Function search appliance in it list
searchAppliance.addEventListener(('input'), (e) => {
  searchStringAppliance = e.target.value.toLowerCase();
  if (searchString.length >= 3 && searchStringAppliance.length >= 1) {
    datasFiltered = filterAppliance(datasFiltered, searchStringAppliance);
    displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
  } else if (searchString.length >= 3) {
    displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
  } else if (searchStringAppliance.length >= 1) {
    datasFiltered = filterAppliance(recipes, searchStringAppliance);
    displayAppliance(datasFiltered, searchAppliance, listAppliance, searchStringAppliance);
  } else if (searchStringAppliance.length === 0) {
    displayAppliance(recipes, searchAppliance, listAppliance, searchStringAppliance);
  }
});

// Function who take the appliance select and display it to the dom
listAppliance.addEventListener(('click'), (e) => {
  displayTagAppliance(e, listAppliance, angleDownAppliance, filterViewAppliance, selectedTagAppliance, filterView);

  if (searchString.length <= 3 && datasFiltered.length === 0) {
    datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
    displayCard(datasFiltered);
  } else {
    datasFiltered = filterTagAppliance(datasFiltered, selectedTagAppliance);
    displayCard(datasFiltered);
  }

  linkTagCloseApps = document.querySelectorAll('.close_tag_app');
  tagTextApps = document.querySelectorAll('.tag_text_app');
  viewApp = document.querySelector('.view_app');

  angleDownIngredients.style.top = '370px';
  angleUpIngredients.style.top = '370px';
  angleDownAppliance.style.top = '370px';
  angleUpAppliance.style.top = '370px';
  angleDownUstensils.style.top = '370px';
  angleUpUstensils.style.top = '370px';
  listIngredients.style.top = '410px';
  listUstensils.style.top = '410px';

  // Function who close the tag appliance selected
  linkTagCloseApps.forEach((linkTagCloseApp) => linkTagCloseApp.addEventListener('click', (e) => {
    tagTextApps.forEach((tagTextApp) => tagTextApp.addEventListener('click', (e) => {
      let text = tagTextApp.innerText.toLowerCase();
      text = text.substring(0, text.length - 1);
      selectedTagAppliance = selectedTagAppliance.filter((item) => item !== text);
      tagTextApp.style.display = 'none';

      if (selectedTagAppliance.length === 0) {
        viewApp.style.display = 'none';
      }

      if (searchString.length < 3 && selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0 && selectedTagUstensils.length === 0) {
        datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
        displayCard(datasFiltered);
      } else if (searchString.length >= 3 && selectedTagAppliance.length === 0) {
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
      } else {
        datasFiltered = filterTagAppliance(recipes, selectedTagAppliance);
        datasFiltered = filterTagsIngredients(datasFiltered, selectedTagIngredients);
        datasFiltered = filterTagUstensils(datasFiltered, selectedTagUstensils);
        displayCard(datasFiltered);
      }

      if (selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0 && selectedTagUstensils.length === 0) {
        mainResetDisplay();
      }
    }));
  }));
  closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils);
});

closeSearchAppliance.addEventListener(('click'), (e) => closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils));

// USTENSILS

// Function open ustensils
const openUstensils = (e) => {
  displayListUstensils(e, angleDownUstensils, angleUpUstensils, filterContainerUstensils, closeSearchUstensils);

  if (searchString.length >= 3) {
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  } else if (datasFiltered.length === 0) {
    displayUstensils(recipes, searchUstensils, listUstensils, searchStringUstensils);
  } else {
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  }
  closeListAppliance(e, angleDownAppliance, angleUpAppliance, searchAppliance, listAppliance, filterContainerAppliance, selectedTagAppliance, angleDownUstensils);
  closeListIngredient(e, angleDownIngredients, angleUpIngredients, searchIngredients, listIngredients, filterContainerIngredients, selectedTagIngredients, angleDownAppliance, angleDownUstensils);
};

searchUstensils.addEventListener(('click'), openUstensils);
openSearchUstensils.addEventListener(('click'), openUstensils);

// Function search ustensils in it list
searchUstensils.addEventListener(('input'), (e) => {
  searchStringUstensils = e.target.value.toLowerCase();
  if (searchString.length >= 3 && searchStringUstensils.length >= 1) {
    datasFiltered = filterUstensils(datasFiltered, searchStringUstensils);
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  } else if (searchString.length >= 3) {
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  } else if (searchStringUstensils.length >= 1) {
    datasFiltered = filterUstensils(recipes, searchStringUstensils);
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  } else if (searchStringUstensils.length === 0) {
    displayUstensils(datasFiltered, searchUstensils, listUstensils, searchStringUstensils);
  }
});

// Function who take the ingredients select and display it to the dom
listUstensils.addEventListener(('click'), (e) => {
  displayTagUstensils(e, listUstensils, angleUpUstensils, filterViewUstensils, selectedTagUstensils, filterView);
  if (searchString.length <= 3 && datasFiltered.length === 0) {
    datasFiltered = filterTagUstensils(recipes, selectedTagUstensils);
    displayCard(datasFiltered);
  } else {
    datasFiltered = filterTagUstensils(datasFiltered, selectedTagUstensils);
    displayCard(datasFiltered);
  }

  linkTagCloseUsts = document.querySelectorAll('.close_tag_usts');
  tagTextUsts = document.querySelectorAll('.tag_text_usts');
  viewUsts = document.querySelector('.view_usts');

  angleDownIngredients.style.top = '370px';
  angleUpIngredients.style.top = '370px';
  angleDownAppliance.style.top = '370px';
  angleUpAppliance.style.top = '370px';
  angleDownUstensils.style.top = '370px';
  angleUpUstensils.style.top = '370px';
  listIngredients.style.top = '410px';
  listAppliance.style.top = '410px';

  // Function who close the tag ustensils selected
  linkTagCloseUsts.forEach((linkTagCloseUst) => linkTagCloseUst.addEventListener('click', (e) => {
    tagTextUsts.forEach((tagTextUst) => tagTextUst.addEventListener('click', (e) => {
      let text = tagTextUst.innerText.toLowerCase();
      text = text.substring(0, text.length - 1);
      selectedTagUstensils = selectedTagUstensils.filter((item) => item !== text);
      tagTextUst.style.display = 'none';

      if (searchString.length < 3 && selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0 && selectedTagUstensils.length === 0) {
        datasFiltered = filterTagUstensils(recipes, selectedTagUstensils);
        displayCard(datasFiltered);
      } else if (searchString.length >= 3 && selectedTagUstensils.length === 0) {
        datasFiltered = filterCard(recipes, searchString);
        displayCard(datasFiltered);
      } else {
        datasFiltered = filterTagUstensils(recipes, selectedTagUstensils);
        datasFiltered = filterTagsIngredients(datasFiltered, selectedTagIngredients);
        datasFiltered = filterTagAppliance(datasFiltered, selectedTagAppliance);
        displayCard(datasFiltered);
      }

      if (selectedTagUstensils.length === 0) {
        viewUsts.style.display = 'none';
      }

      if (selectedTagAppliance.length === 0 && selectedTagIngredients.length === 0 && selectedTagUstensils.length === 0) {
        mainResetDisplay();
      }
    }));
  }));
  closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils);
});

closeSearchUstensils.addEventListener(('click'), (e) => closeListUstensils(e, angleDownUstensils, angleUpUstensils, searchUstensils, listUstensils, filterContainerUstensils, selectedTagUstensils));
