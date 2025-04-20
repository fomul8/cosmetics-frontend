<script setup>
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import InputGroupAddon from 'primevue/inputgroupaddon';

const scoreValue = 43;
const cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
];
</script>

<template>
  <div class="row">
    <div class="col-12 mb-on-s">
      <h1>PROFILE</h1>
    </div>
  </div>
<div class="row">
<!--  User base info-->
  <div class="col-12 col-md-3 mb-on-s">
    <Card>
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
    <Card>
      <template #title>Security</template>
      <template #content>
        <p class="m-0">
          Email: usertest@gmail.com
        </p>
        <p>
          Password: *********
        </p>
      </template>
    </Card>
  </div>
</div>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-12 col-md-9">
      <Card>
        <template #title>Delivery</template>
        <template #content>
          <div style="display: flex; justify-content: space-between;" class="column-on-s">
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="text1" placeholder="Full name" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText placeholder="Adress line 1" />
              </InputGroup>
            </div>
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-map"></i>
                </InputGroupAddon>
                <Select  :options="cities" optionLabel="name" placeholder="City" />
              </InputGroup>

              <InputGroup>
                <InputGroupAddon>$</InputGroupAddon>
                <InputNumber  placeholder="Post code" />
                <InputGroupAddon>1245</InputGroupAddon>
              </InputGroup>
            </div>
          </div>
        </template>
      </Card>
    </div>
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

</style>