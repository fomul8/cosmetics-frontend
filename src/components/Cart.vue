<script setup>

import {computed, ref, onMounted} from "vue";
import {useRoute} from 'vue-router';
import Divider from "primevue/divider";
import Select from 'primevue/select';
import RecpItem from "./parts/RecpItem.vue";
import Button from "primevue/button";
import { apiFetch } from "../helpers/api.js";

const route = useRoute()

const qtyVal = ref(1);
const qtyVal2 = ref(1);
const cartItems = ref([]);

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

onMounted(async () => {
  if (route.query.new) {
    await apiFetch(`/cart-items/?u-recipe-id=${route.query.new}`, {
      method: 'POST',
    });
  }
  cartItems.value = await apiFetch('/cart-items');
});

</script>

<template>
<div class="row" style="margin-bottom: 30px">
  <div class="col-12"><h3>Order items:</h3></div>
</div>

<div class="row">
  <div class="col-12 col-md-5">
    <!--  Item 1-->
    <div class="row" v-for="item in cartItems">
      <div class="col-2">
        <div style="height: 100%; display: flex; align-items: center;">
          <i class="pi pi-box" style="font-size: 1.4rem"></i>
        </div>
      </div>

      <div class="col-7">
        <span style="color: #aa3cc8; margin-bottom: 10px;"><b>{{item.id}}</b></span>
        <div style="display: flex;flex-direction: column; gap: 20px">
          <div style="display: flex; overflow: hidden; align-items: baseline; justify-content: space-between;">
            <span>Volume</span>
            <Select v-model="selectedVolume" size="small" :options="volumes" optionLabel="name" placeholder="" class="w-full md:w-56" />
          </div>
          <div style="display: flex; overflow: hidden; align-items: baseline;  justify-content: space-between;">
            <span>Qty:</span>
            <div style="display: flex; justify-content: space-around; align-items: baseline; gap: 20px">
              <i class="pi pi-minus-circle" @click="decreaseVal" style="font-size: 1.3rem; cursor: pointer"></i>
              <div>{{ item.quantity }}</div>
              <i class="pi pi-plus-circle" @click="addVal" style="font-size: 1.3rem; cursor: pointer"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3"><p style="font-size: 1.4rem; font-weight: bold">$ {{item.price}}</p></div>
    </div>
    <Divider/>
  </div>
  <div class="col-12 col-md-7">
    <div style="width: 100%; text-align: right">
      <h3>Order summary:</h3>
      <p>Subtotal: ${{(selectedVolume.price * 0.2)+selectedVolume.price + shipmentPrice}}</p>
      <p>Sales tax: ${{selectedVolume.price * 0.2}}</p>
      <p>Shipment: ${{shipmentPrice}}</p>
    </div>
  </div>
</div>


  <h3 style="margin-top: 50px">Add to order</h3>
  <div class="row" style="margin-bottom: 60px">
    <div class="col-6 col-md-2"><recp-item/></div>
    <div class="col-6 col-md-2"><recp-item/></div>
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

  backdrop-filter: blur(8px) saturate(186%);
  -webkit-backdrop-filter: blur(8px) saturate(186%);
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(209, 213, 219, 0.3);
}
</style>
