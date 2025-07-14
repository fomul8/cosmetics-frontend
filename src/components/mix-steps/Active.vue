<script setup>
import {ref, computed, onMounted, watch, defineModel, defineEmits} from "vue";
import Toast from "primevue/toast";
import { useToast } from 'primevue/usetoast';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';

import faceIcon from '../../assets/bodypart/face-icon.png';
import handsIcon from '../../assets/bodypart/hands-icon.avif';
import footIcon from '../../assets/bodypart/foot-icon.jpg';
import TestTube from './parts/TestTube.vue';
import IngredientFlask from "./parts/IngredientFlask.vue";
import IngredientBar from './parts/ingredientBar.vue';

const emit = defineEmits(['changeBaseRecipe']);
const toast = useToast();

const ingredientsModel = defineModel('ingredients');
const generalPresets = defineModel('presets');
const sortVal = ref('');

const presetButtons = ref([
  {label: computed(() => {
      return generalPresets.value[0].label ?? 0
    }),
    active: true,
    recipeId: computed(() => {
      return generalPresets.value[0].id ?? 0
    })},
  {label: computed(() => {
      return generalPresets.value[1].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[1].id ?? 0
    })},
  {label: computed(() => {
      return generalPresets.value[2].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[2].id ?? 0
    })},
  {label: computed(() => {
      return generalPresets.value[3].label ?? 0
    }),
    active: false,
    recipeId: computed(() => {
      return generalPresets.value[3].id ?? 0
    })},
])

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 2,
    numScroll: 1
  }
]);

const dialog = ref({visible: false, sublabel: '', label: ''});

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

const countOfSelectedIngredients = computed(() => {
  let count = 0;
  for(const ingredient of ingredientsModel.value) {
    if(ingredient.relativeValue > 0) {
      count++;
    }
  }
  return count;
});

const clickPresetButton = (button) => {
  for(const key in presetButtons.value) {
    presetButtons.value[key].active = false;
  }
  button.active = true;
  emit('changeBaseRecipe', button.recipeId);
}
</script>

<template>
 <h3 style="text-align: center; margin-top: 0">Active ingredients</h3>
  <div class="row" style="">
    <div class="col-12">
      <Carousel :value="presetButtons" :numVisible="2" :numScroll="3" :responsiveOptions="responsiveOptions" :showNavigators="false" :autoplayInterval="1500">
        <template #item="slotProps">
          <Button @click="clickPresetButton(slotProps.data)"
                  class="spring-button carousel-item-btn"
                  :variant="`${(!slotProps.data.active?'outlined':'')}`">{{slotProps.data.label}}</Button>
        </template>
      </Carousel>
    </div>


  </div>

  <div class="row" style="margin-top: 20px">
    <div class="col-9">
<!--      <IngredientFlask v-model:ingredients="ingredientsModel" />-->
      <IngredientBar v-model:ingredients="ingredientsModel" />
    </div>
    <div class="col-3">
      <TestTube :ingredients="ingredientsModel"/>
    </div>
  </div>

  <Toast :baseZIndex="10000"></Toast>
</template>

<style scoped>
.carousel-item-btn {
  line-height: 1.5em;
  min-height: calc(2 * 1.5em);
  width: 90%;
}
</style>
