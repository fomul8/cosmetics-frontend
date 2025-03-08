<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

const router = useRouter();
</script>

<template>
  <h2 style="text-align: center">Make your own cosmetics from best ingredients you want throw away chemical</h2>
<div class="row">
  <div class="col-12">
    <div class="mix-container">
      <img src="../assets/potion1.svg" width="50" class="rotate-30-deg" style="position: relative; top: 10svh; left: 30px;">
      <img src="../assets/potion2.svg" width="70" class="rotate-60-deg" style="position: relative; top: 10%; left: 70%;">
      <img src="../assets/potion3.svg" width="80" class="rotate-10-deg" style="position: relative; top: 20svh; left: 170px;">
      <Button @click="router.push({name: 'mix', params: {id: 1}})" label="MIX" class="mix-btn" variant="outlined" style="font-weight: 900"/>
    </div>
  </div>
</div>
</template>

<style scoped>

.buttons-main {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}
.mix-container {
  height: 30svh;
  width: 100%;
  position: relative;
}

.mix-btn {
  font-size: 2rem;
  width: 100%;
}

.rotate-30-deg {
  transform: rotate(30deg);
}

.rotate-60-deg {
  transform: rotate(-60deg);
}

.rotate-10-deg {
  transform: rotate(10deg);
}

.flex-feature {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: center;
}
</style>