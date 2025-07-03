<script setup>
import {useRoute, useRouter} from 'vue-router';
import {ref, computed, onMounted, nextTick} from "vue";
import {registerDialog, loginDialog} from "../helpers/store.js";
// Steps of creating and order
import Button from 'primevue/button';
import Active from './mix-steps/Active.vue';
import Botanical from "./mix-steps/Botanical.vue";
import Improvers from './mix-steps/Improvers.vue';
// import Info from './mix-steps/Info.vue';
import Oil from './mix-steps/Oil.vue';
import Review from "./mix-steps/Review.vue";
import { useToast } from 'primevue/usetoast';
import { apiFetch } from '../helpers/api.js'
import {isAuthenticated} from "../helpers/auth.js";
import GlassBtn from "./elements/GlassBtn.vue";
import AiIcon from "./AiIcon.vue";
import Skeleton from 'primevue/skeleton';

import Ingredients  from "../beemulation/ingredients.js";
import randomColor from '../helpers/colors';
import {Dialog} from "primevue";
const ingredients = new Ingredients();

const chemicalsGroups = ref([]);
const chemicalIngredients = ref([]);
const router = useRouter();
const toast = useToast();

const steps = ref({
  active: {on: true, dataIngredients: [], prev: null, next: 'oil'},
  oil: {on: false, dataIngredients: [], prev: 'active', next: 'botanical'},
  botanical: {on: false, dataIngredients: [], prev: 'oil', next: 'improvers'},
  improvers: {on: false, dataIngredients: [], prev: 'botanical', next: 'review'},
  // info: {on: false, dataIngredients: [], prev: 'improvers', next: 'review'},
  review: {on: false, dataIngredients: [], prev: 'improvers', next: null}
});
const currentStep = ref('active');
const aiAnalizDialog = ref({
  visible: false,
  processing: false,
  message: ''
})
const presets = ref([{label: 'Default', id: 1, ingredientsVals: [{id: 1, val: 1}]},
  {label: 'Default', id: 2,ingredientsVals: [{id: 3, val: 2}]},
  {label: 'Default', id: 3, ingredientsVals: [{id: 2, val: 1}]},
  {label: 'Default', id: 4, ingredientsVals: [{id: 1, val: 1}] }]
);

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

const cart = async () => {
  if (!await isAuthenticated()) {
    loginDialog.visible = true;
    return;
  }
  try {
    const response = await apiFetch('/recipes/', {method: 'POST', body: JSON.stringify(steps.value)});
    if (response.id) {
      await router.push(`/cart?new=${response.id}`)
    }
  } catch (e) {
    toast.add({severity: 'error', summary: 'Error', group: 'custom', detail: 'Internal error', life: 5000});
  } finally {
    toast.add({severity: 'secondary', summary: 'Added', group: 'custom', detail: 'New recepi', life: 3000});
  }
}

const getPresets = async () => {
  // request to endpoint api/presets
  try {
    const response = await fetch('/api/presets', {headers: {'Cache-Control': 'no-cache'}});
    return await response.json();
  } catch (e) {
    // error from server
  }
}

const changeBaseRecipe = (recipeId) => {
  let ingrids = [];
  let ingridsVals = [];
  // TODO improve this alg
  for (const preset of presets.value) {
    if (preset.id === recipeId) {
        if (preset.relativeValues) {
          for (const presetIngredient of preset.relativeValues) {
            ingrids.push(presetIngredient['ingredient_id']);
            ingridsVals.push(presetIngredient.fraction);
          }
        }
      break;
    }
  }
  for (const ingredient of chemicalIngredients.value) {
    ingredient.relativeValue = 0;
    if (ingrids.includes(ingredient.id)) {
      ingredient.relativeValue = ingridsVals[ingrids.indexOf(ingredient.id)];
      ingredient.visible = true;
    } else {
      ingredient.visible = false;
    }
  }
  chemicalIngredients.value.sort(
      (a, b) => b.relativeValue - a.relativeValue
  );
  reloadStepsIngredients();
}

/*
 Sort chemicalingredients by .relativeValue
 */
const sortIngredientsByRelativeValue = () => {

}

const reloadStepsIngredients = () => {
  steps.value.active.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 1);
  steps.value.oil.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 2);
  steps.value.botanical.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 3);
  steps.value.improvers.dataIngredients = chemicalIngredients.value.filter(ingredient => ingredient.groupId === 4);
  steps.value.improvers.selectors = {prs: true, fra: false};
  console.log(steps.value.active.dataIngredients);
}

const aiAnalyz = async () => {
  aiAnalizDialog.value.message = ''
  aiAnalizDialog.value.visible = true;
  aiAnalizDialog.value.processing = true;

  const analyzedData = await apiFetch('/assistant', {method: 'POST', body: JSON.stringify(steps.value)});
  if (analyzedData.description) {
    aiAnalizDialog.value.message = analyzedData.description;
    aiAnalizDialog.value.processing = false;
  }
}

onMounted(async () => {
  presets.value = await getPresets();
  chemicalsGroups.value = ingredients.getGroups();
  chemicalIngredients.value = await ingredients.getIngredients();
  chemicalIngredients.value.forEach(ingredient => {
    ingredient.color = randomColor();
    ingredient.visible = false;
  });
  reloadStepsIngredients();
  changeBaseRecipe(presets.value[0].id);
});


</script>

<template>
  <Active
      v-if="steps.active.on"
      v-model:ingredients="steps.active.dataIngredients"
      :presets="presets"
      @change-base-recipe="changeBaseRecipe"></Active>
  <Oil v-if="steps.oil.on" v-model:ingredients="steps.oil.dataIngredients"></Oil>
  <Botanical v-if="steps.botanical.on" v-model:ingredients="steps.botanical.dataIngredients"></Botanical>
  <Improvers v-if="steps.improvers.on" v-model:selectors="steps.improvers.selectors"></Improvers>
<!--  <Info v-if="steps.info.on"></Info>-->
  <Review v-if="steps.review.on" :steps="steps"></Review>



  <div class="footer-buttons">
<!--    <Button label="Back" @click="stepBack" variant="outlined" v-if="!steps.active.on"></Button>-->
<!--    <Button label="Next" @click="stepNext" v-if="!steps.review.on" ></Button>-->
<!--    <Button label="Add to cart" @click="cart" v-if="steps.review.on" icon="pi pi-cart-arrow-down"></Button>-->
    <GlassBtn text="Back" @click="stepBack" v-if="!steps.active.on"/>
    <GlassBtn text="Next" @click="stepNext" v-if="!steps.review.on"/>
    <GlassBtn text="Add to cart" @click="stepNext" v-if="steps.review.on"/>
  </div>
  <div @click="aiAnalyz"><AiIcon /></div>


  <Dialog v-model:visible="aiAnalizDialog.visible" modal class="glass-dialog" header="Ai analyz" :style="{ width: '25rem' }">

    <div v-if="aiAnalizDialog.processing" style="margin-bottom: 30px">
      <div style="margin-bottom: 30px; text-align: center">AI analyzing you recipt</div>
      <Skeleton width="10rem" class="mb-2"></Skeleton>
      <Skeleton width="5rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton width="10rem" height="4rem"></Skeleton>
    </div>
    <div v-if="aiAnalizDialog.message">{{aiAnalizDialog.message}}</div>

    <div class="flex items-center gap-4">
      <Button type="button" label="Ok" severity="secondary" @click="aiAnalizDialog.visible = false"></Button>
    </div>
  </Dialog>
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
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
  }
}
</style>
