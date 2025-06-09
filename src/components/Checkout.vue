<script setup>
import {computed, ref} from "vue";
import DeliveryAddress from "./parts/DeliveryAddress.vue";

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
const qtyVal = ref(1);

const volumes = ref(
    [
      { name: '50ml', code: '50', price: 45 },
      { name: '100ml', code: '100', price: 80 },
      { name: '150ml', code: '150', price: 120 },
    ]
);
const selectedVolume = ref({name: '50ml', code: '50', price: 45});


const changeShipment = (key) => {
  shipmentMethod.value.low.active = false;
  shipmentMethod.value.normal.active = false;
  shipmentMethod.value.fast.active = false;

  shipmentMethod.value[key].active = true;
  shipmentPrice.value = shipmentMethod.value[key].basePrice;
}

const priceWithDeliveryAndTax = computed(() => {
  let priceTotal;
  return priceTotal.value + (priceTotal.value * 0.2);
})
</script>

<template>

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
</style>
