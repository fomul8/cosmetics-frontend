<script setup>
import {computed, defineModel} from 'vue';

import INGREDIENT_PARTS_ALLOWED from '../../../constants/constants.js';

const ingredientsModel = defineModel('ingredients');

const totalIndicatorGradient = computed(() => {
  const basicBg = '#e2e8f0';
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
    gradientCssString += `${basicBg} ${lastPercent}%, ${basicBg} 100%, `;
  }
  //remove , from the end of string
  gradientCssString = gradientCssString.slice(0, -2);
  return gradientCssString;
});
</script>

<template>
  <div
      :class="`inner-shadow flacon-total-indicator`"
      :style="`background: linear-gradient(to top, ${totalIndicatorGradient})`">

    <div v-for="n in 20" :style="`width: ${n%5===0?'50%':'25%'}; border-bottom: 1px solid #673ab7`"></div>
    <div style="height: 20px; width: 100%"></div>
  </div>
</template>

<style scoped>
.flacon-total-indicator {
  width: 100%;
  height: 100%;
  border: 2px solid #673ab7;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: flex-end;
}
</style>