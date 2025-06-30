<script setup>
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import InputGroupAddon from 'primevue/inputgroupaddon';

import DeliveryAddress from "./parts/DeliveryAddress.vue";

const scoreValue = 43;
</script>

<template>
  <div class="row">
    <div class="col-12 mb-on-s">
      <h3>PROFILE</h3>
    </div>
  </div>
<div class="row">
<!--  User base info-->
  <div class="col-12 col-md-3 mb-on-s">
    <Card class="glass-card">
      <template #title>Info</template>
      <template #content>
        <p class="m-0">
          Account created: 24.3.2025
        </p>
        <p>
          ID #12345
        </p>
        <p>Science score:</p>
        <ProgressBar :value="scoreValue"></ProgressBar>
      </template>
    </Card>
  </div>

  <div class="col-12 col-md-9 mb-on-s">
    <Card style="position: relative" class="glass-card">
      <template #title>Security</template>
      <template #content>
        <p class="m-0">
          Email: usertest@gmail.com
        </p>
        <p>
          Password: *********
        </p>
        <div class="edit-corner-btn">
          <i class="pi pi-cog"></i>
        </div>
      </template>
    </Card>
  </div>
</div>
  <div class="row">
    <div class="col-12 col-md-3"></div>
    <DeliveryAddress/>
  </div>
</template>

<style scoped>

@media (max-width: 768px) {
  .mb-on-s {
    margin-bottom: 20px;
  }

  .column-on-s {
    flex-direction: column;
  }
}

.edit-corner-btn {
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #daabe7;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
}

</style>
