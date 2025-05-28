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

const shipmentMethod = ref({
  low: {
    active: true,
    basePrice: 15
  },
  normal: {
    active: false,
    basePrice: 20
  },
  fast: {
    active: false,
    basePrice: 23
  }
})
const shipmentPrice = ref(15);

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

const changeShipment = (key) => {
  shipmentMethod.value.low.active = false;
  shipmentMethod.value.normal.active = false;
  shipmentMethod.value.fast.active = false;

  shipmentMethod.value[key].active = true;
  shipmentPrice.value = shipmentMethod.value[key].basePrice;
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
  <div style="width: 100%; text-align: right">
    <h3>Order summary:</h3>
    <p>Subtotal: ${{(selectedVolume.price * 0.2)+selectedVolume.price + shipmentPrice}}</p>
    <p>Sales tax: ${{(selectedVolume.price * 0.2)}}</p>
    <p>Shipment: ${{shipmentPrice}}</p>
  </div>

  <DeliveryAddress/>

  <div style="display: flex; gap: 10px; margin: 40px 0 0 0; flex-direction: column;">
    <div class="shipment-block" @click="changeShipment('low')">
      <i :class="`pi pi-circle-fill ${shipmentMethod.low.active ? 'active-color' : ''}`"></i>
      <div style="width: 60%">Cheap - 10 days</div>
      <div>${{shipmentMethod.low.basePrice}}</div>
    </div>
    <div class="shipment-block" @click="changeShipment('normal')">
      <i :class="`pi pi-circle-fill ${shipmentMethod.normal.active ? 'active-color' : ''}`"></i>
      <div style="width: 60%">Fast - 5 days</div>
      <div>${{shipmentMethod.normal.basePrice}}</div>
    </div>
    <div class="shipment-block" @click="changeShipment('fast')">
      <i :class="`pi pi-circle-fill ${shipmentMethod.fast.active ? 'active-color' : ''}`"></i>
      <div style="width: 60%">Express - 3 days</div>
      <div>${{shipmentMethod.fast.basePrice}}</div>
    </div>
  </div>

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
.shipment-block {
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 1px 21px 0 rgba(0,0,0,0.1);
}

.active-mark {
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #71ce8f;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
}

.active-color {
  color: #673ab7;
}

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
