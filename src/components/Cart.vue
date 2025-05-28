<script setup>

import {computed, ref} from "vue";
import Divider from "primevue/divider";
import Select from 'primevue/select';
import RecpItem from "./parts/RecpItem.vue";
import DeliveryCard from "./parts/DeliveryCard.vue"
import Button from "primevue/button";

import DeliveryAddress from "./parts/DeliveryAddress.vue";

const qtyVal = ref(1);
const qtyVal2 = ref(1);

const volumes = ref(
    [
      { name: '50ml', code: '50', price: 45 },
      { name: '100ml', code: '100', price: 80 },
      { name: '150ml', code: '150', price: 120 },
    ]
);
const selectedVolume = ref({name: '50ml', code: '50', price: 45});
const selectedVolume2 = ref({name: '50ml', code: '50', price: 45});

const shipmentPrice = ref(15);

const priceTotal = computed(() => {
  return (selectedVolume.value.price * qtyVal.value);
});
const priceTotal2 = computed(() => {
  return selectedVolume2.value.price * qtyVal2.value;
});


const addVal = (key=false) => {
  if (key) {
    qtyVal2.value += 1;
  } else {
    qtyVal.value += 1;
  }

}

const decreaseVal = (key=false) => {

  if (key) {
    if (qtyVal2.value >=2) {
      qtyVal2.value = qtyVal2.value - 1;
    }
  } else {
    if (qtyVal.value >=2) {
      qtyVal.value = qtyVal.value - 1;
    }
  }
}

</script>

<template>
<div class="row" style="margin-bottom: 30px">
  <div class="col-12"><h3>Order items:</h3></div>
</div>
<!--  Item 1-->
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
<!--  Item 2-->
  <div class="row">
    <div class="col-2">
      <div style="height: 100%; display: flex; align-items: center;">
        <i class="pi pi-box" style="font-size: 1.4rem"></i>
      </div>
    </div>

    <div class="col-7">
      <span style="color: #aa3cc8; margin-bottom: 10px;"><b>Super item 2</b></span>
      <div style="display: flex;flex-direction: column; gap: 20px">
        <div style="display: flex; overflow: hidden; align-items: baseline; justify-content: space-between;">
          <span>Volume</span>
          <Select v-model="selectedVolume2" size="small" :options="volumes" optionLabel="name" placeholder="" class="w-full md:w-56" />
        </div>
        <div style="display: flex; overflow: hidden; align-items: baseline;  justify-content: space-between;">
          <span>Qty:</span>
          <div style="display: flex; justify-content: space-around; align-items: baseline; gap: 20px">
            <i class="pi pi-minus-circle" @click="decreaseVal(2)" style="font-size: 1.3rem; cursor: pointer"></i>
            <div>{{ qtyVal2 }}</div>
            <i class="pi pi-plus-circle" @click="addVal(2)" style="font-size: 1.3rem; cursor: pointer"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3"><p style="font-size: 1.4rem; font-weight: bold">$ {{priceTotal2}}</p></div>
  </div>
  <Divider/>


  <div style="width: 100%; text-align: right">
    <h3>Order summary:</h3>
    <p>Subtotal: ${{(selectedVolume.price * 0.2)+selectedVolume.price + shipmentPrice}}</p>
    <p>Sales tax: ${{selectedVolume.price * 0.2}}</p>
    <p>Shipment: ${{shipmentPrice}}</p>
  </div>

  <h3 style="margin-top: 50px">Add to order</h3>
  <div class="row" style="margin-bottom: 60px">
    <div class="col-6"><recp-item/></div>
    <div class="col-6"><recp-item/></div>
  </div>

  <div class="buttons-container">
    <Button label="Continue shopping" variant="outlined"></Button>
    <Button label="Checkout"></Button>
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
