<script setup>
import RadioButton from 'primevue/radiobutton';
import SelectButton from 'primevue/selectbutton';
import {ref, computed, onMounted, watch} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';

const toast = useToast();

// const props = defineProps(['ingredients']);
const ingredientsModel = defineModel('ingredients');
const sortVal = ref('moistaraiser');
const sortOptions = ['moistaraiser', 'anti-aging', 'wrinse', 'achne'];
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

const sortIngredientsByEffects = () => {
  const sortedIngredientsMax = [];
  const sortedIngredientsMid = [];
  const sortedIngredientsMin = [];
  for(const ingredient of ingredientsModel.value) {
    const effects = ingredient.effects;
    for(const effect of effects) {
      if(effect.label === sortVal.value) {
        if(effect.value === 2) {
          sortedIngredientsMax.push(ingredient);
        } else if(effect.value === 1) {
          sortedIngredientsMid.push(ingredient);
        } else {
          sortedIngredientsMin.push(ingredient);
        }
      }
    }
  }
  ingredientsModel.value = sortedIngredientsMax.concat(sortedIngredientsMid, sortedIngredientsMin);
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
 <h2>Active ingredients</h2>
  <div class="row">
    <div class="col-12">
      <h4>Sort by:</h4>
      <SelectButton @change="sortIngredientsByEffects" v-model="sortVal" :options="sortOptions" size="small" style="width: 100%"/>
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
.items-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  margin: 0 0 20px 0;
}

.inner-shadow {
  box-shadow: inset 0 0 10px #ffffff;
}

.indicator-3-percent-fill {
  background: linear-gradient(to top, #673ab7 3%, #f8f9fa 33%);
}

.indicator-33-percent-fill {
  background: linear-gradient(to top, #673ab7 33%, #f8f9fa 33%);
}

.indicator-66-percent-fill {
  background: linear-gradient(to top, #673ab7 66%, #f8f9fa 33%);
}

.indicator-100-percent-fill {
  background: linear-gradient(to top, #673ab7 100%, #f8f9fa 33%);
}
</style>