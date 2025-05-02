<script setup>
import {ref, computed, onMounted, watch, defineModel, defineEmits} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';
// import Carousel from 'primevue/carousel';
// import Dialog from 'primevue/dialog';
// import Divider  from "primevue/divider";
import InputGroup from 'primevue/inputgroup';
import Select from 'primevue/select';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Button from 'primevue/button';

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
const selectedExample = ref({});
const sortOptions = ['moistaraiser', 'anti-aging', 'wrinse', 'achne'];
// TODO it is tmp mock
const recipeVariants = ref([
  {label: 'Anti age cream', id: 1},
  {label: 'Anti damage cream', id: 2},
  {label: 'vitamin C cream', id: 3},
]);

const  generalPresets = ref([
  {label: 'Recipes Face care', icon: faceIcon, items: recipeVariants.value, key: 'face'},
  {label: 'Recipes Hands care', icon: handsIcon, items: recipeVariants.value, key: 'hands'},
  {label: 'Recipes Foot care', icon: footIcon, items: recipeVariants.value, key: 'foot'},
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

const countOfSelectedIngredients = computed(() => {
  let count = 0;
  for(const ingredient of ingredientsModel.value) {
    if(ingredient.relativeValue > 0) {
      count++;
    }
  }
  return count;
});

const changeBaseRecipe = () => {
  const id = selectedExample.value.id;
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
  <div class="row" style="">
    <div class="col-6" style="padding: 5px"><Button style="width: 100%" variant="outlined">Blank</Button></div>
    <div class="col-6" style="padding: 5px"><Button style="width: 100%" variant="outlined">Face cream</Button></div>
    <div class="col-6" style="padding: 5px"><Button style="width: 100%" variant="outlined">Body cream</Button></div>
    <div class="col-6" style="padding: 5px"><Button style="width: 100%">Catalogue</Button></div>
  </div>
  <div class="row">
    <div class="col-12">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <Select v-model="selectedExample"
                @change="changeBaseRecipe"
                :options="generalPresets"
                optionLabel="label"
                optionGroupLabel="label"
                optionGroupChildren="items"
                placeholder="Examples of formule" class="w-full md:w-56">
          <template #optiongroup="slotProps">
            <div class="flex items-center">
              <img :alt="slotProps.option.label"
                   :src="slotProps.option.icon"
                   :class="`mr-2 flag`" style="width: 18px; margin-right: 5px" />
              <div>{{ slotProps.option.label}}</div>
            </div>
          </template>
        </Select>
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
</template>

<style scoped>
</style>