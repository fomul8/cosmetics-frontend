<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

const router = useRouter();
</script>

<template>
<div class="row">
  <div class="col-12">
    <div class="mix-container">
      <img src="../assets/potion1.svg" width="50" class="rotate-30-deg" style="position: relative; top: 10svh; left: 30px;">
      <img src="../assets/potion2.svg" width="70" class="rotate-60-deg" style="position: relative; top: 10%; left: 70%;">
      <img src="../assets/potion3.svg" width="80" class="rotate-10-deg" style="position: relative; top: 20svh; left: 170px;">
      <Button @click="router.push('mix')" label="MIX" class="mix-btn" variant="outlined" style="font-weight: 900"/>
    </div>
  </div>
</div>
  <div class="row" style="margin-top: 40px">
    <div class="col-12">
      <h2 style="text-align: center">How it is works?</h2>
    </div>
    <div class="col-12">
      <div class="flex-feature">
        <div>
          <span>Mix uniq cosmetic for you </span>
        </div>
        <img src="../assets/mix-mix.png" width="140">
      </div>
    </div>
    <div class="col-12">
      <div class="flex-feature">
        <img src="../assets/doctor-img.avif" width="140">
        <div>
          <span>Doctor video help bla bla bla </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mix-container {
  height: 30svh;
  width: 100%;
  position: relative;
}

.mix-btn {
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  font-size: 3rem;
  transform: translate(-50%, -50%);
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