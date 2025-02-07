<script setup>

import Button from "primevue/button";
</script>

<template>

  <Button @click="" label="Mix" class="mix-btn" variant="outlined" style="font-weight: 900"/>

  <p>List of ingredients</p>
  <ul>
    <li>HA</li>
    <li>Collagen</li>
    <li>Retinol</li>
    <li>Peptides</li>
    <li>Acid</li>
    <li>Water</li>
  </ul>
</template>

<style scoped>
.mix-btn {
  font-size: 2rem;
  width: 100%;
}

</style>