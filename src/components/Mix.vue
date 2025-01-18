<script setup>
import MeterGroup from 'primevue/metergroup';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref, computed, onMounted, nextTick} from "vue";
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Card from 'primevue/card';
import { useToast } from 'primevue/usetoast';

import Ingredients  from "../beemulation/ingredients.js";
import Ai from "../beemulation/ai.js";

const generalStats = ref([]);
const chemicalsGroups = ref([]);
const chemicalIngredients = ref([]);
// user data
const chemicalIngredientsWithValues = ref([]);

const infoDialog = ref({data: {}, status: false});
const analyzationDialog = ref({message: '', status: false});
const savedRecipi = ref({ingredients: []});
const stepsArray = ref([]);
const showAdvancedIngredients = ref(false);

const showInfoDialog = (data) => {
  infoDialog.value.data = data;
  nextTick(() => {
    infoDialog.value.status = true;
  });
};

const increaseIngredientValue = (ingredient) => {
  if (ingredient.value === 100) {
    return;
  }
  if (checkTotalPercentForGroup(ingredient.groupId) === 100) {
    return;
  }
  ingredient.value += ingredient.step;
};

const decreaseIngredientValue = (ingredient) => {
  if (ingredient.value === 0) {
    return;
  }
  ingredient.value -= ingredient.step;
};

const checkTotalPercentForGroup = (groupId) => {
  const group = chemicalsGroups.value.find(group => group.id === groupId);
  let totalPercent = 0;
  group.ingredients.forEach(ingredient => {
    totalPercent += ingredient.value;
  });
  return totalPercent;
};

const generateRandomSoftColor = () => {
  const hue = Math.floor(Math.random() * 1360);
  return `hsl(${hue}, 100%, 80%)`;
};

const getChosenIngredients = () => {
  return chemicalIngredientsWithValues.value.filter(ingredient => ingredient.value !== 0);
};

const saveRecipi = () => {
  const ingredients = getChosenIngredients();
  const ingredientsLabelArray = ingredients.map(ingredient => ingredient.label);
};

const analyzeRecipi = async () => {
  const ai = new Ai();
  const ingredients = getChosenIngredients();
  const ingredientsLabelArray = ingredients.map(ingredient => ingredient.label);
  const response = await ai.makeAnalyzation(ingredientsLabelArray);
  analyzationDialog.value.message = response;
  analyzationDialog.value.status = true;
};

onMounted(() => {
  // TODO backend emulation
  const ingredients = new Ingredients();
  chemicalsGroups.value = ingredients.getGroups();
  chemicalIngredients.value = ingredients.getIngredients();
  generalStats.value = ingredients.getGeneralStats();

  chemicalIngredientsWithValues.value = chemicalIngredients.value.map(chemical => {
    return {
      ...chemical,
      value: 0,
      color: generateRandomSoftColor()
    }
  });
  for (let i = 0; i < chemicalsGroups.value.length; i++) {
    chemicalIngredientsWithValues.value.forEach(chemical => {
      if (chemical.groupId === chemicalsGroups.value[i].id) {
        chemicalsGroups.value[i].ingredients.push(chemical);
      }
    });
  //   fill all groups with ingredients for steps
    stepsArray.value.push(chemicalsGroups.value[i]);
    if(chemicalsGroups.value[i].primary && !chemicalsGroups.value[i+1].primary) {
      stepsArray.value.push({
        id: 8,
        label: 'All other ingredients',
        ingredients: [],
        primary: true,
        infoText: 'All other ingredients prepared for you, you can modify whatever you want but be awared that this can affect the final product'
      });
    }
  }
});
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div v-for="stat in generalStats" class="card" style="padding: 0; margin-top: 10px">
        <MeterGroup :value="[stat]" labelPosition="start" labelOrientation="vertical" />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-12">

      <Stepper value="1">
        <StepItem v-for="(group, index) in stepsArray" :class="`${!group.primary && !showAdvancedIngredients ? 'd-none' : ''}`" :key="index" :value="index">
          <Step>{{ group.label }}</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="" v-if="!group.infoText">
              <MeterGroup :value="group.ingredients" labelPosition="start" style="margin-bottom: 20px">
                <template #label="{ value }">
                  <div class="flex flex-wrap gap-4" style="display: flex; gap: 10px">
                    <template v-for="val of value" :key="val.label">
                      <Card class="flex-1 border border-surface shadow-none" :style="`width: 100%; border-left: 2px solid ${val.color}`">
                        <template #content>
                          <div class="flex justify-between gap-8">
                            <div class="flex flex-col gap-1" style="display: flex; justify-content: space-between; align-items: baseline">
                              <span class="text-surface-500 dark:text-surface-400 text-sm">{{ val.label }}</span>
                              <i v-if="val.effects.length !== 0" class="pi pi-info-circle" @click="showInfoDialog(val.effects)"></i>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 15px">
                              <Button label="-" severity="secondary" @click="decreaseIngredientValue(val)" />
                              <div style="font-weight: bold">{{ val.value }}%</div>
                              <Button label="+" severity="secondary" @click="increaseIngredientValue(val)" />
                            </div>
                          </div>
                        </template>
                      </Card>
                    </template>
                  </div>
                </template>
                <template #meter="slotProps">
                  <span :class="slotProps.class" :style="{ background: `linear-gradient(to right, ${slotProps.value.color}, ${slotProps.value.color})`, width: slotProps.size }" />
                </template>
                <template #start="{ totalPercent }">
                  <div class="flex justify-between mt-4 mb-2 relative" style="display: flex; gap: 20px; font-weight: bold">
                    <span>Volume</span>
                    <span :style="{ width: totalPercent + '%' }" class="absolute text-right">{{ totalPercent }}%</span>
                  </div>
                </template>
                <template #end>
                </template>
              </MeterGroup>

              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <Button v-if="index === 0" label="Back" @click="activateCallback(index - 1)" />
                <Button v-if="index !== 0 && index !== (stepsArray.length - 1)" label="Next" @click="activateCallback(index + 1)" />
                <Button v-if="index === stepsArray.length" label="Save" @click="saveRecipi" />
              </div>
            </div>
            <div v-if="group.infoText">
              <div v-if="group.infoText">{{group.infoText}}</div>
              <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                <Button label="Advanced" @click="activateCallback(index + 1);showAdvancedIngredients=true" severity="danger"/>
                <Button label="Use standart" @click="saveRecipi" />
              </div>

            </div>
          </StepPanel>
        </StepItem>

      </Stepper>

      <div style="display: flex; justify-content: space-between; margin-top: 10px">
        <Button label="Analyze" @click="analyzeRecipi" />
        <Button label="Buy" />
      </div>
    </div>
  </div>

  <Dialog v-model:visible="infoDialog.status" modal header="Effects" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Potential effects of ingredient</span>
    <ul>
      <li v-for="effect in infoDialog.data" :key="effect.label" class="flex justify-between gap-2" style="display: flex; justify-content: space-between">
        <span>{{ effect.label }}</span>
        <span :style="`${effect.value === '-' ? 'color: red;' : ''}`">{{ effect.value }}</span>
      </li>
    </ul>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Ok" @click="infoDialog.status = false"></Button>
    </div>
  </Dialog>

  <Dialog v-model:visible="analyzationDialog.status" modal header="Anayz" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Potential effects of ingredient</span>
    <span>{{analyzationDialog.message}}</span>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Ok" @click="analyzationDialog.status = false"></Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>