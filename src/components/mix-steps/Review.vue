<script setup>
import {defineModel, defineProps, onMounted, onUnmounted} from "vue";
import Divider from "primevue/divider";

const { steps } = defineProps(['steps']);
import INGREDIENT_PARTS_ALLOWED from "../../constants/constants.js";

const calculateRelativePartsToPercent = (ingredient, allIngredients) => {
  let totalRelativeParts = 0;
  for (const item of allIngredients) {
    totalRelativeParts += item.relativeValue;
  }
  const ingredientPercent = (ingredient.relativeValue / totalRelativeParts)*100;
  return ingredientPercent;
}

onMounted(() => {
  const keys = Object.keys(steps);
  console.log(123);
});

onUnmounted(() => {
  console.log('Review ВЫКЛ');
});
</script>

<template>
  <h3 style="text-align: center; margin-bottom: 40px;">List of ingredients</h3>
  <p><b>Active ingredients:</b></p>
  <div v-for="item in steps.active.dataIngredients">
    <div v-if="item.relativeValue">
      <span><b>{{item.label}}</b> - {{calculateRelativePartsToPercent(item, steps.active.dataIngredients)}}%</span>
    </div>
  </div>
  <Divider />
  <p><b>Oil ingredients:</b></p>
  <div v-for="item in steps.oil.dataIngredients">
    <div v-if="item.relativeValue">
      <span><b>{{item.label}}</b> - {{calculateRelativePartsToPercent(item, steps.oil.dataIngredients)}}%</span>
    </div>
  </div>
  <Divider />
  <p><b>Botanical ingredients:</b></p>
  <div v-for="item in steps.botanical.dataIngredients">
    <div v-if="item.relativeValue">
      <span><b>{{item.label}}</b> - {{calculateRelativePartsToPercent(item, steps.botanical.dataIngredients)}}%</span>
    </div>
  </div>
  <Divider />
  <p><b>Improvers:</b></p>
  <div>
    You choose {{steps.improvers.selectors.prs ? 'Preservatives' : ''}}{{steps.improvers.selectors.prs && steps.improvers.selectors.fra  ? ', ' : ''}}{{steps.improvers.selectors.fra ? 'Fragrances' : ''}}
  </div>
  <Divider />
</template>

<style scoped>
.mix-btn {
  font-size: 2rem;
  width: 100%;
}

</style>
