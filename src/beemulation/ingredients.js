import {ref} from "vue";
import {BACKEND_URL} from "../helpers/global_constants.js";

/**
 * Class Ingredients
 * @class
 * @classdesc Class for Ingredients, emulate backend requests
 * @constructor
 * @property {Array} ingredients - Array of ingredients
 * @property {Array} chemicalsGroups - Array of chemicals groups
 * @method setIngredients - Set ingredients
 * @method setGroups - Set groups
 * @method getIngredients - Get ingredients
 * @method getGroups - Get groups
 * @method setGeneralStats - Set general stats
 * @method getGeneralStats - Get general stats
 */
class Ingredients {
    constructor() {
        this.ingredients = [];
        this.chemicalsGroups = [];
        this.generelalStats = [];
        this.setGroups();
    }

    /*
    * TODO in future get from backend
     */
    setGroups() {
        const chemicalsGroups = [
            { label: 'Active ingredients', value: 24, id: 1, primary: true,  ingredients: [] },
            { label: 'Oils', value: 16, id: 2, primary: true, ingredients: [] },
            { label: 'Preservative', value: 24, id: 7, primary: false, ingredients: [] },
            { label: 'Humectants', value: 24, id: 3, primary: false, ingredients: [] },
            { label: 'Emulsifiers', value: 12, id: 4,primary: false, ingredients: [] },
            { label: 'Thickeners', value: 12, id: 5,primary: false, ingredients: [] },
            { label: 'Improvers', value: 12, id: 6,primary: false, ingredients: [] },
        ];
        this.chemicalsGroups = chemicalsGroups;
    }


    /**
     * Fetches the list of ingredients from the backend API and updates the local ingredients array.
     *
     * @async
     * @returns {Promise<Array>} A promise that resolves with the fetched ingredients array or an empty array in case of failure.
     */
    async getIngredients() {
        try {
            let response = await fetch('/api/ingredients');
            if (response.ok) {
                let chemicalIngredients = await response.json();
                this.ingredients = chemicalIngredients;
                return Promise.resolve(chemicalIngredients);
            } else {
                console.error(`Failed to fetch ingredients: ${response.status} ${response.statusText}`);
                return Promise.resolve([]);
            }
        } catch (error) {
            console.error(`An error occurred: ${error.message}`);
            return Promise.resolve([]);
        }
    }

    getGroups() {
        return this.chemicalsGroups;
    }

    getIngredientsByRecipeId(id, groupId) {
        const ingredients = this.ingredients.filter(ingredient => ingredient.groupId === groupId);
        ingredients[id-1].relativeValue = 2;
        ingredients[id].relativeValue = 1;
        ingredients[id+1].relativeValue = 1;
        return ingredients;
    }
}

export default Ingredients;