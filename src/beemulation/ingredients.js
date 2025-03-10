import {ref} from "vue";

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
        this.setIngredients();
        this.setGroups();
    }


    /**
     * TODO in future get from backend
     * @returns {[]}
     */
    setIngredients() {
        const sortOptions = ['moistaraiser', 'anti-aging', 'wrinse', 'achne'];
        const chemicalIngredients = [
            {
                label: 'Hyaluronic Acid',
                id: 1,
                groupId: 1,
                relativeValue: 0,
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
                effects: []
            },
            {
                label: 'Squalane',
                id: 9,
                groupId: 2,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Shea Butter',
                id: 10,
                groupId: 2,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Rosehip Oil',
                id: 11,
                groupId: 2,
                relativeValue: 3,
                effects: []
            },
            {
                label: 'Argan Oil',
                id: 12,
                groupId: 2,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Grapeseed Oil',
                id: 13,
                groupId: 2,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Avocado Oil',
                id: 14,
                groupId: 2,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Glycerin',
                id: 15,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Hyaluronic Acid',
                id: 16,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Aloe Vera',
                id: 17,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Ceramides',
                id: 18,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Sodium PCA',
                id: 19,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Butylene',
                id: 20,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Urea',
                id: 21,
                groupId: 3,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Cetearyl Alcohol',
                id: 22,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Glyceryl Stearate',
                id: 23,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Polysorbates',
                id: 24,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Cetearyl Glucoside',
                id: 25,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Lecithin',
                id: 26,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'PEG-100',
                id: 27,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Sorbitan Stearate',
                id: 28,
                groupId: 4,
                relativeValue: 0,
                effects: []
            },
            {
                label: 'Xanthan Gum',
                id: 29,
                groupId: 5,
                relativeValue: 0,
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
        this.ingredients = chemicalIngredients;
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

    getIngredients() {
        return this.ingredients;
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