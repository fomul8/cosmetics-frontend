<script setup>
import ToggleSwitch from 'primevue/toggleswitch';
import Divider from 'primevue/divider';
import {defineModel, ref} from "vue";

const selectors = defineModel('selectors');

</script>

<template>
  <h2 style="text-align: center">Improvers</h2>
  <div class="row">
    <div class="col-12">
      <div class="improver-container">
        <h3>
          preservatives
        </h3>
        <ToggleSwitch v-model="selectors.prs" offLabel="No"/>
      </div>
      <span style="font-size: 11px; color: gray">While necessary for stability, some preservatives may cause irritation or allergies in sensitive skin. Natural alternatives, like benzyl alcohol and plant extracts, offer gentler options.</span>
      <Divider />
      <div class="improver-container">
        <h3>
          fragrances
        </h3>
        <ToggleSwitch v-model="selectors.fra" offLabel="No"/>
      </div>
      <span style="font-size: 11px; color: gray">Fragrances can cause irritation or allergies in sensitive skin. Natural fragrances, like essential oils, are less likely to cause irritation than synthetic options.</span>
      <Divider />
    </div>
  </div>
</template>

<style scoped>
.improver-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
}
</style>
