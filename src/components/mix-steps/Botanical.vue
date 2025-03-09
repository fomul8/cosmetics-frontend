<script setup>
import {ref, computed, onMounted, watch, defineModel} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';
import TestTube from "./parts/TestTube.vue";
import IngredientFlask from "./parts/IngredientFlask.vue";

const toast = useToast();

const ingredientsModel = defineModel('ingredients');

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
  <h2 style="text-align: center">Botanical</h2>
  <div class="row">
    <div class="col-12">
    </div>
  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
      <IngredientFlask :ingredients="ingredientsModel" />
    </div>
    <div class="col-3">
      <TestTube :ingredients="ingredientsModel"/>
    </div>
  </div>
  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>
</style>