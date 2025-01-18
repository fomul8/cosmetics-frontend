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
        this.setGeneralStats();
        this.setIngredients();
        this.setGroups();
    }

    setGeneralStats() {
        const generelalStats = [
            { label: 'Greasy, sticky', color: '#34d399', value: 24 },
            { label: 'Tight and fluid', color: '#fbbf24', value: 16 },
            { label: 'Life', color: '#60a5fa', value: 24 },
            { label: 'Sun protection factor(SPF)', color: '#c084fc', value: 12 }
        ];
        this.generelalStats = generelalStats;
    }

    getGeneralStats() {
        return this.generelalStats;
    }

    /**
     * TODO in future get from backend
     * @returns {[]}
     */
    setIngredients() {
        const chemicalIngredients = [
            {
                label: 'Hyaluronic Acid',
                id: 1,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'intense hydration' },
                    { value: '+', label: 'plumping effects' },
                    { value: '+', label: 'smoothing fine lines' },
                    { value: '-', label: 'skin irritation' }
                ]
            },
            {
                label: 'Retinoids',
                id: 2,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'boost collagen production' },
                    { value: '+', label: 'accelerate cell turnover' },
                    { value: '+', label: 'reduce wrinkles and age spots' },
                    { value: '-', label: 'skin irritation' }
                ]
            },
            {
                label: 'Vitamin C',
                id: 3,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'brightens skin' },
                    { value: '+', label: 'antioxidant that protects against free radical damage' },
                    { value: '+', label: 'boosts collagen production' },
                    { value: '+', label: 'reducing signs of aging' },
                    { value: '-', label: 'skin irritation' }
                ]
            },
            {
                label: 'Peptides',
                id: 4,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'support collagen and elastin production' },
                    { value: '+', label: 'promoting firmer and smoother skin' },
                    { value: '+', label: 'reduce the appearance of wrinkles' }
                ]
            },
            {
                label: 'Niacinamide',
                id: 5,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'reduces inflammation' },
                    { value: '+', label: 'improves skin elasticity' },
                    { value: '+', label: 'fades hyperpigmentation' },
                    { value: '+', label: 'strengthens the skin barrier' }
                ]
            },
            {
                label: 'Ceramides',
                id: 6,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'helps restore youthful resilience' },
                    { value: '+', label: 'reduce fine lines' }
                ]
            },
            {
                label: 'AHAs',
                id: 7,
                groupId: 1,
                step: 5,
                effects: [
                    { value: '+', label: 'remove dead skin cells' },
                    { value: '+', label: 'improve skin texture' }
                ]
            },
            {
                label: 'Jojoba Oil',
                id: 8,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Squalane',
                id: 9,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Shea Butter',
                id: 10,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Rosehip Oil',
                id: 11,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Argan Oil',
                id: 12,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Grapeseed Oil',
                id: 13,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Avocado Oil',
                id: 14,
                groupId: 2,
                step: 5,
                effects: []
            },
            {
                label: 'Glycerin',
                id: 15,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Hyaluronic Acid',
                id: 16,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Aloe Vera',
                id: 17,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Ceramides',
                id: 18,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Sodium PCA',
                id: 19,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Butylene',
                id: 20,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Urea',
                id: 21,
                groupId: 3,
                step: 5,
                effects: []
            },
            {
                label: 'Cetearyl Alcohol',
                id: 22,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Glyceryl Stearate',
                id: 23,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Polysorbates',
                id: 24,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Cetearyl Glucoside',
                id: 25,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Lecithin',
                id: 26,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'PEG-100',
                id: 27,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Sorbitan Stearate',
                id: 28,
                groupId: 4,
                step: 5,
                effects: []
            },
            {
                label: 'Xanthan Gum',
                id: 29,
                groupId: 5,
                step: 25,
                effects: []
            },
            {
                label: 'Carbomers',
                id: 30,
                groupId: 5,
                step: 25,
                effects: []
            },
            {
                label: 'Hydroxyethylcellulose',
                id: 31,
                groupId: 5,
                step: 25,
                effects: []
            },
            {
                label: 'Cetearyl Alcohol',
                id: 32,
                groupId: 5,
                step: 25,
                effects: []
            },
            {
                label: 'Chelating Agents',
                id: 33,
                groupId: 6,
                step: 25,
                effects: []
            },
            {
                label: 'pH Adjusters',
                id: 34,
                groupId: 6,
                step: 25,
                effects: []
            },
            {
                label: 'Antioxidants',
                id: 35,
                groupId: 6,
                step: 25,
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
            { label: 'Emollients(Oils)', value: 16, id: 2, primary: true, ingredients: [] },
            { label: 'Preservative', value: 24, id: 7, primary: true, ingredients: [] },
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
}

export default Ingredients;