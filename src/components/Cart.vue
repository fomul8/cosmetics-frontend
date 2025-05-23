<script setup>

import {computed, ref} from "vue";
import Divider from "primevue/divider";
import Select from 'primevue/select';
import RecpItem from "./parts/RecpItem.vue";
import DeliveryCard from "./parts/DeliveryCard.vue"

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

  <h3 style="margin-top: 50px">Delivery:</h3>
  <div style="display: flex; gap: 10px; align-items: stretch;">
    <div class="delivery-card">
      <div style="z-index: 10"><i class="pi pi-home"></i> <b>home</b></div>
      <div style="z-index: 10">N.Y manhettan 1 apt 1010 road 1.</div>
      <div style="z-index: 10">ZIP 222222</div>
      <div class="map-icon-box"></div>
    </div>
    <div class="delivery-card" style="justify-content: center">
      <i class="pi pi-plus" style="font-size: 1.2rem; color: #aa3cc8;"></i>
    </div>
  </div>

  <div style="display: flex; gap: 10px; margin: 40px 0 0 0">
    <DeliveryCard @click="changeDeliveryCompany('ups')" :active="deliveryCompanys.ups" :company="`ups`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('dhl')" :active="deliveryCompanys.dhl" :company="`dhl`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('uspost')" :active="deliveryCompanys.uspost" :company="`us-post`"></DeliveryCard>
    <DeliveryCard @click="changeDeliveryCompany('usforce')" :active="deliveryCompanys.usforce" :company="`us-space-force`"></DeliveryCard>
  </div>

  <h3 style="margin-top: 50px">Add to order</h3>
  <div class="row">
    <div class="col-6"><recp-item/></div>
    <div class="col-6"><recp-item/></div>
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
