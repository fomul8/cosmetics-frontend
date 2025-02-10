<script setup>
import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
import {ref, computed, onMounted, watch, defineModel} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';

import randomColor from '../../helpers/colors';
import flaskA from '../active-icons/flaskA.vue';
import flaskB from '../active-icons/flaskB.vue';

const toast = useToast();
const INGREDIENT_PARTS_ALLOWED = 4;

const ingredientsModel = defineModel('ingredients');
const sortVal = ref('moistaraiser');
const sortOptions = ['moistaraiser', 'anti-aging', 'wrinse', 'achne'];
const totalIndicatorGradient = computed(() => {
  const total = calculateTotalIndicator();
  let gradientCssString = '';
  const percentEq = 100 / INGREDIENT_PARTS_ALLOWED;
  let lastPercent = 0;
  for(let ingredient of ingredientsModel.value) {
    if(ingredient.relativeValue > 0) {
      const percent = percentEq * ingredient.relativeValue;
      gradientCssString += `${ingredient.color} ${lastPercent}%, ${ingredient.color} ${percent + lastPercent}%, `;
      lastPercent += percent;
    }
  }
  if (lastPercent < 100) {
    gradientCssString += `#fff ${lastPercent}%, #fff 100%, `;
  }
  //remove , from the end of string
  gradientCssString = gradientCssString.slice(0, -2);
  console.log(gradientCssString);
  return gradientCssString;
});

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

const calculateTotalIndicator = () => {
  let total = 0;
  for(const ingredient of ingredientsModel.value) {
    total += ingredient.relativeValue;
  }
  return total;
}

const countOfSelectedIngredients = computed(() => {
  let count = 0;
  for(const ingredient of ingredientsModel.value) {
    if(ingredient.relativeValue > 0) {
      count++;
    }
  }
  return count;
})

</script>

<template>
 <h2 style="text-align: center">Active ingredients</h2>
  <div class="row">
    <div class="col-12">
      <h4>Sort by:</h4>
      <SelectButton @change="sortIngredientsByEffects" v-model="sortVal" :options="sortOptions" size="small" style="width: 100%"/>
    </div>
  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
      <div class="items-container" v-for="ingredient in ingredientsModel">
        <div class="flex gap-2" style="align-items: center">
          <i class="pi pi-plus-circle" @click="addValue(ingredient)" style="font-size: 1rem; cursor: pointer"></i>
          <div v-if="ingredient.relativeValue === 0">
            <flaskA :color="ingredient.color"/>
          </div>
          <div v-if="ingredient.relativeValue !== 0">
            <flaskB :color="ingredient.color"/>
          </div>
          <i class="pi pi-minus-circle" @click="removeValue(ingredient)" style="font-size: 1rem; cursor: pointer"></i>
          <div>{{ ingredient.label }}</div>
          <span style="font-size: 8px; color: red;">v part ({{ingredient.relativeValue}})</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div
          :class="`inner-shadow`"
          :style="`width: 100%; height: 100%; border: 2px solid #673ab7; border-radius: 5px; background: linear-gradient(to top, ${totalIndicatorGradient})`"></div>
    </div>
  </div>
  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>

</style>