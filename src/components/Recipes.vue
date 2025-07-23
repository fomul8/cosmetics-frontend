<script setup>
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import Fieldset from 'primevue/fieldset';
import { ref, onMounted } from "vue";
import {apiFetch} from "../helpers/api.js";

const recipes = ref([]);

const deleteRec = async (recipe) => {
  if (window.confirm("Are you sure you want to delete this recepi?")) {
    await apiFetch(`/recipes/${recipe.id}/`, {
      method: 'DELETE',
    });
    recipes.value = await apiFetch('/recipes/');
  }
}

onMounted(async () => {
  recipes.value = await apiFetch('/recipes/');
})
</script>

<template>
<h3>Recipes</h3>
  <Accordion value="1">
    <AccordionPanel v-for="item in recipes" :value="item.label">
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
          <p style="text-align: center;"><i @click="deleteRec(item)" class="pi pi-trash"></i> <i style="margin-left: 20px" class="pi pi-cart-plus"></i></p>
        </Fieldset>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
  <div v-if="recipes.length === 0">
    <p style="text-align: center; font-size: 1.2rem">Ops, you dont have created recipes yet</p>
  </div>
</template>

<style scoped>

</style>
