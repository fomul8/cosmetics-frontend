import {INGREDIENT_PARTS_ALLOWED} from "../../constants/constants.js";


const addValue = (ingredient) => {
    const total = calculateTotalIndicator();
    if(ingredient.relativeValue === INGREDIENT_PARTS_ALLOWED || total === INGREDIENT_PARTS_ALLOWED) {
        toast.add({severity: 'secondary', summary: 'limit', detail: 'Maximum value, decrease something', life: 3000});
        return;
    }
    ingredient.relativeValue++;
}

const removeValue = (ingredient) => {
    if(ingredient.relativeValue === 0) {
        return;
    }
    ingredient.relativeValue--;
}
