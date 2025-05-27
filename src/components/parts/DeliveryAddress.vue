<script setup>
import {computed, ref} from "vue";
import Select from 'primevue/select';
import Button from "primevue/button";
import {InputText} from "primevue";
import {Message} from "primevue";

const states = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'District of Columbia', code: 'DC' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' }
];

const newAddress = ref({
  visible: false,
})
</script>

<template>
  <h3 style="margin-top: 50px">Delivery:</h3>
  <div style="display: flex; gap: 10px; align-items: stretch;">
    <div class="delivery-card">
      <div style="z-index: 10"><i class="pi pi-home"></i> <b>home</b></div>
      <div style="z-index: 10">N.Y manhettan 1 apt 1010 road 1.</div>
      <div style="z-index: 10">ZIP 222222</div>
      <div class="map-icon-box"></div>
    </div>
    <div class="delivery-card" @click="newAddress.visible = !newAddress.visible" style="justify-content: center">
      <i class="pi pi-plus" v-if="!newAddress.visible" style="font-size: 1.2rem; color: #aa3cc8;"></i>
      <i class="pi pi-minus" v-if="newAddress.visible" style="font-size: 1.2rem; color: #aa3cc8;"></i>
    </div>
  </div>
  <div class="delivery-card" v-if="newAddress.visible" style="margin-top: 30px;">
    <p>New delivery address</p>
    <div class="new-addr-row">
      <label for="first-name">First Name</label>
      <InputText id="first-name" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="last-name">Last Name</label>
      <InputText id="last-name" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="company">Company</label>
      <InputText id="company" v-model="value" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div class="new-addr-row">
      <label for="addr-1">Address Line 1</label>
      <InputText id="addr-1" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="addr-2">Address Line 2</label>
      <InputText id="addr-2" v-model="value" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div class="new-addr-row">
      <label for="city">City</label>
      <InputText id="city" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="state">State</label>
      <Select :options="states" optionLabel="name" placeholder="Select a state"></Select>
    </div>
    <div class="new-addr-row">
      <label for="zip">ZIP code</label>
      <InputText id="zip" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="phone">Phone number</label>
      <InputText id="phone" v-model="value" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="instructions">Delivery Instructions</label>
      <InputText id="instructions" v-model="value" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div style="display: flex; justify-content: center; padding: 20px">
      <Button label="Save" style="width: 100%" severity="outlined"></Button>
    </div>
  </div>
</template>

<style scoped>
.delivery-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid silver;
  border-radius: 6px;
  padding: 20px;
  box-shadow: 0 1px 21px 0 rgba(0,0,0,0.1);
}

.new-addr-row {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.map-icon-box {
  position: absolute;
  right: 0;
  top: 0;
  width: 270px;
  height: 100%;
  background: url("/map.png");
  background-size: cover;
  box-shadow: 84px -6px 26px 30px rgba(255,255,255,0.85) inset;
}
</style>
