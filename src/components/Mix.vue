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

import Ingredients  from "../beemulation/ingredients.js";

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

}

onMounted(() => {
  chemicalsGroups.value = ingredients.getGroups();
  chemicalIngredients.value = ingredients.getIngredients();
  steps.value.active.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 1);
  steps.value.oil.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 2);
});


</script>

<template>
  <Active v-if="steps.active.on" v-model:ingredients="steps.active.dataIngredients"></Active>
  <Oil v-if="steps.oil.on" v-model:ingredients="steps.oil.dataIngredients"></Oil>
  <Botanical v-if="steps.botanical.on"></Botanical>
  <Improvers v-if="steps.improvers.on"></Improvers>
  <Info v-if="steps.info.on"></Info>
  <Review v-if="steps.review.on"></Review>


  <div class="footer-buttons">
    <Button label="Back" @click="stepBack" variant="outlined" v-if="!steps.active.on"></Button>
    <Button label="Next" @click="stepNext" v-if="!steps.review.on" ></Button>
    <Button label="Checkout" @click="checkout" v-if="steps.review.on"></Button>
  </div>
</template>

<style scoped>
.footer-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  padding: 20px 0;
  width: calc(100% - 40px);
}
</style>