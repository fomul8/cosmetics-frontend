<script setup>
import {defineModel, defineEmits, ref} from 'vue';
import FlaskA from "../../active-icons/flaskA.vue";
import FlaskB from "../../active-icons/flaskB.vue";
import {INGREDIENT_PARTS_ALLOWED} from '../../../constants/constants.js';
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
    <div
        v-if="ingredient.visible"
        class="ingredient-bar-container"
        :style="`background: linear-gradient(
                                    to right,
                                    ${ingredient.color} 0%,
                                    ${ingredient.color} ${ingredient.relativeValue * 20}%,
                                    rgba(255, 255, 255, 0.4) ${ingredient.relativeValue * 20}%,
                                    rgba(255, 255, 255, 0.4) 100%
                                  );`"
    >
      <i class="pi pi-minus" @click="removeValue(ingredient)" style="font-size: 1.4rem; cursor: pointer"></i>
      <div>{{ ingredient.label }}  <i class="pi pi-question-circle" @click="showIngredientInfo(ingredient)" style="font-size: 1rem; cursor: pointer"></i></div>
      <i class="pi pi-plus" @click="addValue(ingredient)" style="font-size: 1.4rem; cursor: pointer"></i>
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

.ingredient-bar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  gap: 1rem;
  margin: 8px 0;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px) saturate(186%);
}
</style>
