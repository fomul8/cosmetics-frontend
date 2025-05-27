<script setup>

import {computed, ref} from "vue";
import Divider from "primevue/divider";
import Select from 'primevue/select';
import RecpItem from "./parts/RecpItem.vue";
import DeliveryCard from "./parts/DeliveryCard.vue"
import Button from "primevue/button";

import DeliveryAddress from "./parts/DeliveryAddress.vue";

const qtyVal = ref(1);

const volumes = ref(
    [
      { name: '50ml', code: '50', price: 45 },
      { name: '100ml', code: '100', price: 80 },
      { name: '150ml', code: '150', price: 120 },
    ]
);
const selectedVolume = ref({name: '50ml', code: '50', price: 45});
const deliveryCompanys = ref({
  ups: true,
  dhl: false,
  uspost: false,
  usforce: false
});
const priceTotal = computed(() => {
  return selectedVolume.value.price * qtyVal.value;
})

const priceWithDeliveryAndTax = computed(() => {
  return priceTotal.value + (priceTotal.value * 0.2);
})

const addVal = () => {
  qtyVal.value += 1;
}

const decreaseVal = () => {
  if (qtyVal.value >=2) {
    qtyVal.value = qtyVal.value - 1;
  }
}

const animationShakeElement = () => {

}

const changeDeliveryCompany = (companyKey) => {
  const keys = Object.keys(deliveryCompanys.value)
  for (let key of keys) {
    deliveryCompanys.value[key] = false;
  }
  deliveryCompanys.value[companyKey] = true;

  console.log(deliveryCompanys.value);
}
</script>

<template>
<div class="row" style="margin-bottom: 30px">
  <div class="col-12"><h3>Order items:</h3></div>
</div>
  <div class="row">
    <div class="col-2">
      <div style="height: 100%; display: flex; align-items: center;">
        <i class="pi pi-box" style="font-size: 1.4rem"></i>
      </div>
    </div>

    <div class="col-7">
      <span style="color: #aa3cc8; margin-bottom: 10px;"><b>Super recip name</b></span>
      <div style="display: flex;flex-direction: column; gap: 20px">
        <div style="display: flex; overflow: hidden; align-items: baseline; justify-content: space-between;">
          <span>Volume</span>
          <Select v-model="selectedVolume" size="small" :options="volumes" optionLabel="name" placeholder="" class="w-full md:w-56" />
        </div>
        <div style="display: flex; overflow: hidden; align-items: baseline;  justify-content: space-between;">
          <span>Qty:</span>
          <div style="display: flex; justify-content: space-around; align-items: baseline; gap: 20px">
            <i class="pi pi-minus-circle" @click="decreaseVal" style="font-size: 1.3rem; cursor: pointer"></i>
            <div>{{ qtyVal }}</div>
            <i class="pi pi-plus-circle" @click="addVal" style="font-size: 1.3rem; cursor: pointer"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3"><p style="font-size: 1.4rem; font-weight: bold">$ {{priceTotal}}</p></div>
  </div>
  <Divider/>
  <div style="font-size: 1.1rem; font-weight: bold; width: 100%; text-align: right">Total with delivery: ${{priceWithDeliveryAndTax}}</div>

  <DeliveryAddress/>

  <div style="display: flex; gap: 10px; margin: 40px 0 0 0">
    <DeliveryCard @click="changeDeliveryCompany('ups')" :active="deliveryCompanys.ups" :company="`ups`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('dhl')" :active="deliveryCompanys.dhl" :company="`dhl`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('uspost')" :active="deliveryCompanys.uspost" :company="`us-post`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('usforce')" :active="deliveryCompanys.usforce" :company="`us-space-force`"></DeliveryCard>
  </div>
  <div style="font-size: 1.1rem; font-weight: bold; width: 100%; text-align: right; margin-top: 30px">Delivery: $30</div>

  <h3 style="margin-top: 50px">Add to order</h3>
  <div class="row" style="margin-bottom: 60px">
    <div class="col-6"><recp-item/></div>
    <div class="col-6"><recp-item/></div>
  </div>

  <div class="buttons-container">
    <Button label="Continue shopping" variant="outlined"></Button>
    <Button label="Payment"></Button>
  </div>
</template>

<style scoped>

.buttons-container {
  display: flex;
  justify-content: end;
  gap: 20px;
  position: fixed;
  bottom: 0;
  padding: 20px;
  left: 0;
  width: 100%;
  background-color: white;
}
</style>
