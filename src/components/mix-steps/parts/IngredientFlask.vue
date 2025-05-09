<script setup>
import {defineModel, defineEmits, ref} from 'vue';
import FlaskA from "../../active-icons/flaskA.vue";
import FlaskB from "../../active-icons/flaskB.vue";
import INGREDIENT_PARTS_ALLOWED from '../../../constants/constants.js';
import Toast from "primevue/toast";
import {useToast} from "primevue/usetoast";
import Button from "primevue/button";
import {Dialog} from "primevue";

const ingredientsModel = defineModel('ingredients');
const toast = useToast();
const emit = defineEmits(['addValue', 'removeValue']);

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

const ingredientInfoDialog = ref({
  visible: false,
  ingredient: null,
})

const showIngredientInfo = (ingredient) => {
  ingredientInfoDialog.value.visible = true;
  ingredientInfoDialog.value.ingredient = ingredient;
}

</script>

<template>
  <div class="items-container" v-for="ingredient in ingredientsModel">
    <div class="flex gap-2" style="align-items: center">
      <i class="pi pi-minus-circle" @click="removeValue(ingredient)" style="font-size: 1.3rem; cursor: pointer"></i>
      <div v-if="ingredient.relativeValue === 0">
        <flaskA :color="ingredient.color"/>
      </div>
      <div v-if="ingredient.relativeValue !== 0">
        <flaskB :color="ingredient.color"/>
      </div>
      <i class="pi pi-plus-circle" @click="addValue(ingredient)" style="font-size: 1.3rem; cursor: pointer"></i>
      <div>{{ ingredient.label }}</div>
      <i class="pi pi-question-circle" @click="showIngredientInfo(ingredient)" style="font-size: 1rem; cursor: pointer"></i>
    </div>
  </div>



  <!--  ingredient info dialog-->
  <Dialog v-model:visible="ingredientInfoDialog.visible" modal header="Info" :style="{ width: '25rem' }">
    <div style="margin-bottom: 30px; text-align: center">{{ingredientInfoDialog.ingredient.description ?? '----'}}</div>

    <div class="flex items-center gap-4">
      <Button type="button" label="Ok" severity="secondary" @click="ingredientInfoDialog.visible = false"></Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>
