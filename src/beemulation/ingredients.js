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
     * TODO in future get from backend
     * @returns {[]}
     */
    mockIngredients() {
        const loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        this.ingredients = [
            {
                label: 'Hyaluronic Acid',
                id: 1,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 2, label: 'moistaraiser' },
                    { value: 0, label: 'anti-aging' },
                    { value: 1, label: 'wrinse' },
                    { value: 1, label: 'achne' }
                ]
            },
            {
                label: 'Retinoids',
                id: 2,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 0, label: 'moistaraiser' },
                    { value: 2, label: 'anti-aging' },
                    { value: 2, label: 'wrinse' },
                    { value: 0, label: 'achne' }
                ]
            },
            {
                label: 'Vitamin C',
                id: 3,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 1, label: 'moistaraiser' },
                    { value: 2, label: 'anti-aging' },
                    { value: 0, label: 'wrinse' },
                    { value: 0, label: 'achne' }
                ]
            },
            {
                label: 'Peptides',
                id: 4,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 0, label: 'moistaraiser' },
                    { value: 2, label: 'anti-aging' },
                    { value: 0, label: 'wrinse' },
                    { value: 0, label: 'achne' }
                ]
            },
            {
                label: 'Niacinamide',
                id: 5,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 0, label: 'moistaraiser' },
                    { value: 2, label: 'anti-aging' },
                    { value: 1, label: 'wrinse' },
                    { value: 2, label: 'achne' }
                ]
            },
            {
                label: 'Ceramides',
                id: 6,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 1, label: 'moistaraiser' },
                    { value: 0, label: 'anti-aging' },
                    { value: 2, label: 'wrinse' },
                    { value: 0, label: 'achne' }
                ]
            },
            {
                label: 'AHAs',
                id: 7,
                groupId: 1,
                relativeValue: 0,
                description: loremipsum,
                effects: [
                    { value: 0, label: 'moistaraiser' },
                    { value: 1, label: 'anti-aging' },
                    { value: 2, label: 'wrinse' },
                    { value: 0, label: 'achne' }
                ]
            },
            {
                label: 'Jojoba Oil',
                id: 8,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Squalane',
                id: 9,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Shea Butter',
                id: 10,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Rosehip Oil',
                id: 11,
                groupId: 2,
                relativeValue: 3,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Argan Oil',
                id: 12,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Grapeseed Oil',
                id: 13,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Avocado Oil',
                id: 14,
                groupId: 2,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Glycerin',
                id: 15,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Hyaluronic Acid',
                id: 16,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Aloe Vera',
                id: 17,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Ceramides',
                id: 18,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Sodium PCA',
                id: 19,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Butylene',
                id: 20,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Urea',
                id: 21,
                groupId: 3,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Cetearyl Alcohol',
                id: 22,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Glyceryl Stearate',
                id: 23,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Polysorbates',
                id: 24,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Cetearyl Glucoside',
                id: 25,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Lecithin',
                id: 26,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'PEG-100',
                id: 27,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Sorbitan Stearate',
                id: 28,
                groupId: 4,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Xanthan Gum',
                id: 29,
                groupId: 5,
                relativeValue: 0,
                description: loremipsum,
                effects: []
            },
            {
                label: 'Carbomers',
                id: 30,
                groupId: 5,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Hydroxyethylcellulose',
                id: 31,
                groupId: 5,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Cetearyl Alcohol',
                id: 32,
                groupId: 5,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Chelating Agents',
                id: 33,
                groupId: 6,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'pH Adjusters',
                id: 34,
                groupId: 6,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Antioxidants',
                id: 35,
                groupId: 6,
                relativeValue: 0,
                effects: []
            }
        ];
        return this.ingredients;
    }

    /**
     * Fetches the list of ingredients from the backend API and updates the local ingredients array.
     *
     * @async
     * @returns {Promise<Array>} A promise that resolves with the fetched ingredients array or an empty array in case of failure.
     */
    async getIngredients() {
        return Promise.resolve(this.mockIngredients());
        try {
            let response = await fetch('/api/ingredients', {headers: {'Cache-Control': 'no-cache'}});
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

    /*
     * TODO this is tmp logic implement with real recepies
     *
     * DEPRECATED
     */
    getIngredientsByRecipeId(id, groupId) {
        const ingredients = this.ingredients.filter(ingredient => ingredient.groupId === groupId);

        if (!id) {
            for (let i = 0; i < ingredients.length; i++) {
                ingredients[i].relativeValue = 0;
            }
        } else {
            ingredients[id-1].relativeValue = 2;
            ingredients[id].relativeValue = 1;
            ingredients[id+1].relativeValue = 1;
        }
        return ingredients;
    }
}

export default Ingredients;
