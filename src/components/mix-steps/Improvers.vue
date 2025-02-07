<script setup>
import ToggleSwitch from 'primevue/toggleswitch';
import Divider from 'primevue/divider';
import {ref} from "vue";

const prs = ref(false);
const emu = ref(false);
const fra = ref(false);

</script>

<template>
  <h2 style="text-align: center">Improvers</h2>
  <div class="row">
    <div class="col-12">
      <div class="improver-container">
        <h3>
          preservatives
        </h3>
        <ToggleSwitch v-model="prs" onLabel="Yes" offLabel="No"/>
      </div>
      <span style="font-size: 8px; color: gray">While necessary for stability, some preservatives may cause irritation or allergies in sensitive skin. Natural alternatives, like benzyl alcohol and plant extracts, offer gentler options.</span>
      <Divider />
      <div class="improver-container">
        <h3>
          emulsifiers
        </h3>
        <ToggleSwitch v-model="emu" onLabel="Yes" offLabel="No"/>
      </div>
      <span style="font-size: 8px; color: gray">Emulsifiers are necessary for combining water and oil-based ingredients. Natural emulsifiers, like beeswax and lecithin, are less likely to cause irritation than synthetic options.</span>
      <Divider />
      <div class="improver-container">
        <h3>
          fragrances
        </h3>
        <ToggleSwitch v-model="fra" onLabel="Yes" offLabel="No"/>
      </div>
      <span style="font-size: 8px; color: gray">Fragrances can cause irritation or allergies in sensitive skin. Natural fragrances, like essential oils, are less likely to cause irritation than synthetic options.</span>
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