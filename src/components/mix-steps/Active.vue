<script setup>
import {ref, computed, onMounted, watch, defineModel, defineEmits} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';

import faceIcon from '../../assets/bodypart/face-icon.png';
import handsIcon from '../../assets/bodypart/hands-icon.avif';
import footIcon from '../../assets/bodypart/foot-icon.jpg';
import TestTube from './parts/TestTube.vue';
import IngredientFlask from "./parts/IngredientFlask.vue";

const emit = defineEmits(['changeBaseRecipe']);
const toast = useToast();

const ingredientsModel = defineModel('ingredients');
const generalPresets = defineModel('presets');
const sortVal = ref('');
const selectedExample = ref({});

const presetButtons = ref({
  b1: {label: computed(() => {
    return generalPresets.value[0].label ?? 0
    }),
    active: true,
    recipeId: computed(() => {
      return generalPresets.value[0].id ?? 0
    })},
  b2: {label: computed(() => {
      return generalPresets.value[1].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[1].id ?? 0
    })},
  b3: {label: computed(() => {
      return generalPresets.value[2].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[2].id ?? 0
    })},
  b4: {label: computed(() => {
      return generalPresets.value[3].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[3].id ?? 0
    })},
})

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

const clickPresetButton = (button) => {
  for(const key in presetButtons.value) {
    presetButtons.value[key].active = false;
  }
  button.active = true;
  emit('changeBaseRecipe', button.recipeId);
}
</script>

<template>
 <h2 style="text-align: center">Active ingredients</h2>
  <div class="row" style="">
    <div class="col-6">
      <Button @click="clickPresetButton(presetButtons.b1)"
              style="width: 100%; margin-bottom: 10px"
              class="spring-button"
              :variant="`${(!presetButtons.b1.active?'outlined':'')}`">{{presetButtons.b1.label}}</Button></div>
    <div class="col-6">
      <Button @click="clickPresetButton(presetButtons.b2)"
              style="width: 100%; margin-bottom: 10px"
              :variant="`${(!presetButtons.b2.active?'outlined':'')}`">{{presetButtons.b2.label}}</Button></div>
    <div class="col-6">
      <Button @click="clickPresetButton(presetButtons.b3)"
              style="width: 100%; margin-bottom: 10px"
              :variant="`${(!presetButtons.b3.active?'outlined':'')}`">{{presetButtons.b3.label}}</Button></div>
    <div class="col-6">
      <Button @click="clickPresetButton(presetButtons.b4)"
              :variant="`${(!presetButtons.b4.active?'outlined':'')}`"
              style="width: 100%; margin-bottom: 10px">{{presetButtons.b4.label}}</Button></div>
  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
      <IngredientFlask v-model:ingredients="ingredientsModel" />
    </div>
    <div class="col-3">
      <TestTube :ingredients="ingredientsModel"/>
    </div>
  </div>

  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>
</style>
