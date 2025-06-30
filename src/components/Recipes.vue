<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Fieldset from 'primevue/fieldset';
import { ref, onMounted } from "vue";
import {apiFetch} from "../helpers/api.js";

const recipes = ref([
  {
    "id": 1,
    "label": "2025-06-05 15:44:59",
    "locked_from_delete": false,
    "hide_from_user": false,
    "ingredients": [
      {
        "id": 4,
        "label": "Vitamin B3 (Niacinamide)",
        "description": "Niacinamide (Vitamin B3) – Improves skin elasticity, ...",
        "groupId": 1,
        "fraction": 1
      },
      {
        "id": 2,
        "label": "Retinol (Vitamin A)",
        "description": "Boosts collagen production, accelerates cell turnover, ...",
        "groupId": 1,
        "fraction": 1
      },
      {
        "id": 43,
        "label": "Zinc PCA",
        "description": "Oil-regulating, antimicrobial, soothing",
        "groupId": 1,
        "fraction": 3
      }
    ]
  },
  {
    "id": 2,
    "label": "self title",
    "locked_from_delete": false,
    "hide_from_user": false,
    "ingredients": [
      {
        "id": 4,
        "label": "Vitamin B3 (Niacinamide)",
        "description": "Niacinamide (Vitamin B3) – Improves skin elasticity, ...",
        "groupId": 1,
        "fraction": 1
      },
      {
        "id": 43,
        "label": "Zinc PCA",
        "description": "Oil-regulating, antimicrobial, soothing",
        "groupId": 1,
        "fraction": 3
      }
    ]
  }
]);

onMounted(async () => {
  // recipes.value = await apiFetch('/recipes/');
})
</script>

<template>
<h1>Recipes</h1>
  <Accordion value="1">
    <AccordionPanel v-for="item in recipes" :value="item">
      <AccordionHeader>
        <div style="display: flex; justify-content: space-between; padding-right: 10px; width: 100%">
          <div>{{ item.label }}</div>

        </div>
      </AccordionHeader>
      <AccordionContent>
        <Fieldset legend="Ingredients">
          <p class="m-0">
            <span v-for="ingr in item.ingredients">{{ingr.label}}, </span>
          </p>
        </Fieldset>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>

<style scoped>

</style>
