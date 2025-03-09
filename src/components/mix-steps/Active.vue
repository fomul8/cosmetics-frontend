<script setup>
import {ref, computed, onMounted, watch, defineModel, defineEmits} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';
import Carousel from 'primevue/carousel';
import Dialog from 'primevue/dialog';
import Divider  from "primevue/divider";
import InputGroup from 'primevue/inputgroup';
import Select from 'primevue/select';
import InputGroupAddon from 'primevue/inputgroupaddon';

import faceIcon from '../../assets/bodypart/face-icon.png';
import handsIcon from '../../assets/bodypart/hands-icon.avif';
import footIcon from '../../assets/bodypart/foot-icon.jpg';
import TestTube from './parts/TestTube.vue';
import IngredientFlask from "./parts/IngredientFlask.vue";

const emit = defineEmits(['changeBaseRecipe']);
const toast = useToast();
const INGREDIENT_PARTS_ALLOWED = 4;

const ingredientsModel = defineModel('ingredients');
const sortVal = ref('');
const sortOptions = ['moistaraiser', 'anti-aging', 'wrinse', 'achne'];
// TODO it is tmp mock
const recipeVariants = ref([
  {label: 'Anti age cream', id: 1},
  {label: 'Anti damage cream', id: 2},
  {label: 'vitamin C cream', id: 3},
]);

const  generalPresets = ref([
  {label: 'Recipes Face care', icon: faceIcon, key: 'face'},
  {label: 'Recipes Hands care', icon: handsIcon, key: 'hands'},
  {label: 'Recipes Foot care', icon: footIcon, key: 'foot'},
]);
const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 2,
    numScroll: 1
  }
]);

const dialog = ref({visible: false, sublabel: '', label: ''});

// const addValue = (ingredient) => {
//   const total = calculateTotalIndicator();
//   if(ingredient.relativeValue === INGREDIENT_PARTS_ALLOWED || total === INGREDIENT_PARTS_ALLOWED) {
//     toast.add({severity: 'secondary', summary: 'limit', detail: 'Maximum value, decrease something', life: 3000});
//     return;
//   }
//   ingredient.relativeValue++;
// }
//
// const removeValue = (ingredient) => {
//   if(ingredient.relativeValue === 0) {
//     return;
//   }
//   ingredient.relativeValue--;
// }

const sortIngredientsByEffects = () => {
  const sortedIngredientsMax = [];
  const sortedIngredientsMid = [];
  const sortedIngredientsMin = [];
  for(const ingredient of ingredientsModel.value) {
    const effects = ingredient.effects;
    for(const effect of effects) {
      if(effect.label === sortVal.value) {
        if(effect.value === 2) {
          sortedIngredientsMax.push(ingredient);
        } else if(effect.value === 1) {
          sortedIngredientsMid.push(ingredient);
        } else {
          sortedIngredientsMin.push(ingredient);
        }
      }
    }
  }
  ingredientsModel.value = sortedIngredientsMax.concat(sortedIngredientsMid, sortedIngredientsMin);
}

// const calculateTotalIndicator = () => {
//   let total = 0;
//   for(const ingredient of ingredientsModel.value) {
//     total += ingredient.relativeValue;
//   }
//   return total;
// }

const countOfSelectedIngredients = computed(() => {
  let count = 0;
  for(const ingredient of ingredientsModel.value) {
    if(ingredient.relativeValue > 0) {
      count++;
    }
  }
  return count;
});

const getRecipeVariants = () => {
  return recipeVariantsMock.value;
}

const choosePresetsDialog = (key) => {
  dialog.value.visible = true;
  for(const preset of generalPresets.value) {
    if(preset.key === key) {
      dialog.value.sublabel = `You choose ${preset.label} global presets`;
      dialog.value.label = 'Choose presets';
    }
  }
}

const changeBaseRecipe = (id) => {
  dialog.value.visible = false;
  for(const recipe of recipeVariants.value) {
    if(recipe.id === id) {
      toast.add({severity: 'success', summary: 'Success', detail: `You choose ${recipe.label} as a base recipe`, life: 3000});
    }
  }
  for(const ingredient of ingredientsModel.value) {
    ingredient.relativeValue = 0;
  }
  emit('changeBaseRecipe', id);
}
</script>

<template>
 <h2 style="text-align: center">Active ingredients</h2>
  <div class="row">
    <div class="col-12">
      <Carousel :value="generalPresets" :numVisible="3" :numScroll="3" :responsiveOptions="responsiveOptions">
        <template #item="slotProps">
          <div @click="choosePresetsDialog(slotProps.data.key)">
            <img :src="slotProps.data.icon" style="width: 70px; height: 70px"/>
            <div>{{slotProps.data.label}}</div>
          </div>
        </template>
      </Carousel>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <Select v-model="sortVal" :options="sortOptions" placeholder="sort by effect" />
      </InputGroup>
    </div>
  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
      <IngredientFlask :ingredients="ingredientsModel" />
    </div>
    <div class="col-3">
      <TestTube :ingredients="ingredientsModel"/>
    </div>
  </div>

  <Toast :baseZIndex="10000"></Toast>

  <Dialog v-model:visible="dialog.visible" modal header="Choose presets" :style="{ width: '80rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">{{dialog.sublabel}}.</span>
    <span class="text-surface-500 dark:text-surface-400" >You can use our recipe as a basis and adapt it to your needs.</span>
    <div class="flex items-center" style="flex-direction: column">
      <div v-for="item in recipeVariants">
        <div @click="changeBaseRecipe(item.id)" style="padding: 5px 0; width: 100%;">{{item.label}}</div>
        <Divider />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
</style>