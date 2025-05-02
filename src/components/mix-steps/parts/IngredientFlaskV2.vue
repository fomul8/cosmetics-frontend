<script setup>
import {defineModel, defineEmits} from 'vue';
import FlaskA from "../../active-icons/flaskA.vue";
import FlaskB from "../../active-icons/flaskB.vue";
import INGREDIENT_PARTS_ALLOWED from '../../../constants/constants.js';
import Toast from "primevue/toast";
import {useToast} from "primevue/usetoast";

const ingredientsModel = defineModel('ingredients');
const toast = useToast();
const emit = defineEmits(['addValue', 'removeValue']);

// const addValue = (ingredient) => {
//   emit('addValue', ingredient);
// };
//
// const removeValue = (ingredient) => {
//   emit('removeValue', ingredient);
// };

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

const calculateTotalIndicator = () => {
  let total = 0;
  for(const ingredient of ingredientsModel.value) {
    total += ingredient.relativeValue;
  }
  return total;
}
</script>

<template>
  <div class="items-container" v-for="ingredient in ingredientsModel">
    <div class="flex gap-2" style="align-items: center">

      <div v-if="ingredient.relativeValue === 0">
        <flaskA :color="ingredient.color"/>
      </div>
      <div v-if="ingredient.relativeValue !== 0">
        <flaskB :color="ingredient.color"/>
      </div>
      <i class="pi pi-plus-circle" @click="addValue(ingredient)" style="font-size: 1rem; cursor: pointer; color: darkgreen"></i>
      <i class="pi pi-question-circle" style="font-size: 1rem; cursor: pointer; color: goldenrod"></i>
      <i class="pi pi-minus-circle" @click="removeValue(ingredient)" style="font-size: 1rem; cursor: pointer; color: crimson"></i>
      <div>{{ ingredient.label }}</div>

    </div>
  </div>

  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>

</style>
