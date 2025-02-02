<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

const router = useRouter();
</script>

<template>
<div class="row">
  <div class="col-12">
    <h2 style="text-align: center">Make your own cosmetics from best ingredients you want throw away chemical</h2>
  </div>
</div>
<div class="row">
  <div class="col-12">
    <div class="buttons-main">
      <Button @click="router.push({name: 'mix', params: {id: 1}})" label="Face care" class="mix-btn" variant="outlined" style="font-weight: 900"/>
      <Button @click="router.push({name: 'mix', params: {id: 2}})" label="Body care" class="mix-btn" variant="outlined" style="font-weight: 900"/>
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
  width: 70%;
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