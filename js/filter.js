// filter function of the main search with the second algo
export function filterCard(datas, searchString) {
  let datasFiltered = [];
  for (let i = 0; i < datas.length; i++) {
    for (let y = 0; y < datas[i].ingredients.length; y++) {
      if (datas[i].name.toLowerCase().includes(searchString) || datas[i].description.toLowerCase().includes(searchString)
                || datas[i].ingredients[y].ingredient.toLowerCase().includes(searchString)) {
        datasFiltered.push(datas[i]);
      }
    }
  }
  datasFiltered = Array.from(new Set(datasFiltered));
  return datasFiltered;
}

// filter function of the ingredients search
export function filterIngredients(datas, searchStingIngredients) {
  datas = datas.filter((data) => data.ingredients.find((el) => (el.ingredient).toLowerCase().includes(searchStingIngredients)));
  return datas;
}

// filter function of the ingredients tag
export function filterTagsIngredients(datas, selectedTagIngredients) {
  for (let i = 0; i < selectedTagIngredients.length; i++) {
    datas = datas.filter((data) => data.ingredients.find((el) => (el.ingredient).toLowerCase().includes(selectedTagIngredients[i])));
  }
  return datas;
}

// filter function of the appliance search
export function filterAppliance(datas, searchStringAppliance) {
  datas = datas.filter((data) => data.appliance.toLowerCase().includes(searchStringAppliance));
  return datas;
}

// filter function of the appliance tag
export function filterTagAppliance(datas, selectedTagAppliance) {
  for (let i = 0; i < selectedTagAppliance.length; i++) {
    datas = datas.filter((data) => data.appliance.toLowerCase().includes(selectedTagAppliance[i]));
  }
  return datas;
}

// filter function of the ustensils search
export function filterUstensils(datas, searchStringUstensils) {
  datas = datas.filter((data) => data.ustensils.find((el) => el.toLowerCase().includes(searchStringUstensils)));
  return datas;
}

// filter function of the ustensils tag
export function filterTagUstensils(datas, selectedTagUstensils) {
  for (let i = 0; i < selectedTagUstensils.length; i++) {
    datas = datas.filter((data) => data.ustensils.find((el) => el.toLowerCase().includes(selectedTagUstensils[i])));
  }
  return datas;
}
