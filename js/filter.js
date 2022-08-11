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