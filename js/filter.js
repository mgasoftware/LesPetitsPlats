export function filterCard(datas, searchString) {
    datas = datas.filter(data => data.name.toLowerCase().includes(searchString)
        || data.description.toLowerCase().includes(searchString)
        || data.ingredients.find(el => {
            return (el.ingredient).toLowerCase().includes(searchString);
        }));
    return datas;
}

export function filterIngredients(datas, searchStingIngredients) {
    datas = datas.filter(data => data.ingredients.find(el => {
        return (el.ingredient).toLowerCase().includes(searchStingIngredients);
    }));
    return datas;
}

export function filterTagsIngredients(datas, selectedTagIngredients) {
    for (let i = 0; i < selectedTagIngredients.length; i++) {
        datas = datas.filter(data => data.ingredients.find(el => {
            return (el.ingredient).toLowerCase().includes(selectedTagIngredients[i]);
        }));
    }
    return datas;
}

export function filterAppliance(datas, searchStringAppliance) {
    datas = datas.filter(data => data.appliance.toLowerCase().includes(searchStringAppliance));
    return datas;
}

export function filterTagAppliance(datas, selectedTagAppliance) {
    for (let i = 0; i < selectedTagAppliance.length; i++) {
        datas = datas.filter(data => data.appliance.toLowerCase().includes(selectedTagAppliance[i]));
    }
    return datas;
}