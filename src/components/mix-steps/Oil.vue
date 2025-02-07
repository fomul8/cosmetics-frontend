<script setup>
import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
import {ref, computed, onMounted, watch, defineModel} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const ingredientsModel = defineModel('ingredients');
const totalIndicatorClass = computed(() => {
  const total = calculateTotalIndicator();
  if(total === 0) {
    return 'indicator-0-percent-fill';
  } else if(total === 1) {
    return 'indicator-33-percent-fill';
  } else if(total === 2) {
    return 'indicator-66-percent-fill';
  } else {
    return 'indicator-100-percent-fill';
  }
});

const addValue = (ingredient) => {
  const total = calculateTotalIndicator();
  if(ingredient.relativeValue === 3 || total === 3) {
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
  if(!ingredientsModel.value) {
    return total;
  }
  for(const ingredient of ingredientsModel.value) {
    total += ingredient.relativeValue;
  }
  return total;
}

</script>

<template>
  <h2 style="text-align: center">Oil</h2>
  <div class="row">
    <div class="col-12">
    </div>
  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
      <div class="items-container" v-for="ingredient in ingredientsModel">
        <div class="flex gap-2" style="align-items: center">
          <i class="pi pi-plus-circle" @click="addValue(ingredient)" style="font-size: 1rem; cursor: pointer"></i>
          <img v-if="ingredient.relativeValue === 0" src="../../assets/flask2-0.svg" width="40">
          <img v-if="ingredient.relativeValue !== 0" src="../../assets/flask2-1.svg" width="40">
          <i class="pi pi-minus-circle" @click="removeValue(ingredient)" style="font-size: 1rem; cursor: pointer"></i>
          <div>{{ ingredient.label }}</div>
          <span style="font-size: 8px; color: red;">v part ({{ingredient.relativeValue}})</span>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div :class="`${totalIndicatorClass } inner-shadow`" style="width: 100%; height: 100%; border: 2px solid #673ab7; border-radius: 5px"></div>
    </div>
  </div>
  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>

</style>