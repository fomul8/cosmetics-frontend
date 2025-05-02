<script setup>
import { useRoute } from 'vue-router';
import {ref, computed, onMounted, nextTick} from "vue";
// Steps of creating and order
import Button from 'primevue/button';
import Active from './mix-steps/Active.vue';
import Botanical from "./mix-steps/Botanical.vue";
import Improvers from './mix-steps/Improvers.vue';
import Info from './mix-steps/Info.vue';
import Oil from './mix-steps/Oil.vue';
import Review from "./mix-steps/Review.vue";
import Shipment from "./mix-steps/Shipment.vue";
import Submit from "./mix-steps/Submit.vue";

import ProgressBar from 'primevue/progressbar';

import Ingredients  from "../beemulation/ingredients.js";
import randomColor from '../helpers/colors';
const ingredients = new Ingredients();
const route = useRoute();

const chemicalsGroups = ref([]);
const chemicalIngredients = ref([]);

const steps = ref({
  active: {on: true, dataIngredients: [], prev: null, next: 'oil'},
  oil: {on: false, dataIngredients: [], prev: 'active', next: 'botanical'},
  botanical: {on: false, dataIngredients: [], prev: 'oil', next: 'improvers'},
  improvers: {on: false, dataIngredients: [], prev: 'botanical', next: 'info'},
  info: {on: false, dataIngredients: [], prev: 'improvers', next: 'review'},
  review: {on: false, dataIngredients: [], prev: 'info', next: null}
});
const currentStep = ref('active')

const stepBack = () => {
  const prevStepKey = steps.value[currentStep.value].prev;
  steps.value[currentStep.value].on = false;
  currentStep.value = prevStepKey;
  steps.value[prevStepKey].on = true;
}

const stepNext = () => {
  const newStepKey = steps.value[currentStep.value].next;
  steps.value[currentStep.value].on = false;
  currentStep.value = newStepKey;
  steps.value[newStepKey].on = true;
}

const checkout = () => {
  console.log(steps.value);
}

const changeBaseRecipe = (id) => {
  const groupId = 1;
  steps.value.active.dataIngredients = ingredients.getIngredientsByRecipeId(id, groupId);
}

onMounted(async () => {
  chemicalsGroups.value = ingredients.getGroups();
  chemicalIngredients.value = await ingredients.getIngredients();
  chemicalIngredients.value.forEach(ingredient => {
    ingredient.color = randomColor();
  });
  steps.value.active.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 1);
  steps.value.oil.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 2);
  steps.value.botanical.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 3);
});


</script>

<template>
  <ProgressBar style="display: none" :value="30"> {{ 1 }} of 5 steps </ProgressBar>
  <Active v-if="steps.active.on" v-model:ingredients="steps.active.dataIngredients" @change-base-recipe="changeBaseRecipe"></Active>
  <Oil v-if="steps.oil.on" v-model:ingredients="steps.oil.dataIngredients"></Oil>
  <Botanical v-if="steps.botanical.on" v-model:ingredients="steps.botanical.dataIngredients"></Botanical>
  <Improvers v-if="steps.improvers.on"></Improvers>
  <Info v-if="steps.info.on"></Info>
  <Review v-if="steps.review.on"></Review>


  <div class="footer-buttons">
    <Button label="Back" @click="stepBack" variant="outlined" v-if="!steps.active.on"></Button>
    <Button label="Next" @click="stepNext" v-if="!steps.review.on" ></Button>
    <Button label="Mix and checkout" @click="checkout" v-if="steps.review.on"></Button>
  </div>
</template>

<style scoped>
.footer-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  width: 100%;
}
@media (max-width: 768px) {
  .footer-buttons {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    z-index: 10;
  }
}
</style>