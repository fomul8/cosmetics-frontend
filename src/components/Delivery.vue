<script setup>
import {useRoute, useRouter} from 'vue-router';
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";
import Skeleton from 'primevue/skeleton';

import DeliveryAddress from "./parts/DeliveryAddress.vue";
import {apiFetch} from "../helpers/api.js";
import {computed, onMounted, ref} from "vue";
import Divider from "primevue/divider";
import Button from "primevue/button";

const route = useRoute();
const router = useRouter();
const toast  = useToast();

const cartItems = ref([]);
const shipments = ref([]);
const priceTotal = computed(() => {
  return cartItems.value.reduce( (accumulator, currentValue) => accumulator + currentValue.total_price, 0)
});

const saveAddress = async addressObject => {
  addressObject['country_id'] = 1;
  try {
    const result = await apiFetch(`/users/delivery/${addressObject.id ? addressObject.id + '/' : ''}`, {
      method: addressObject.id ? 'PATCH' : 'POST',
      body: addressObject
    }, true);
    if (result.ok) {
      toast.add({severity: 'secondary', summary: 'Success', detail: 'Address saved!', life: 5000});
      await router.push('/profile');
    }
  } catch (e) {
    showErrors(e);
  }
}

const deleteAddress = async addressObject => {
  try {
    const result = await apiFetch(`/users/delivery/${addressObject.id}/`, {
      method: 'DELETE'
    }, true);
    if (result.ok) {
      toast.add({severity: 'secondary', summary: 'Success', detail: 'Address deleted!', life: 5000});
    }
  } catch (e) {
    showErrors(e);
  }
}

//TODO refactor replace to module for global use
const showErrors = attemptResult => {
  const errorsFields = Object.keys(attemptResult);
  let messageTemplate = `<ul style="margin:0; padding-left: 1.2rem">`;

  for (const key of errorsFields) {
    const messages = Array.isArray(attemptResult[key])
        ? attemptResult[key]
        : [attemptResult[key]];

    for (const msg of messages) {
      messageTemplate += `<li><strong>${msg}</strong></li>`;
    }
  }

  messageTemplate += `</ul>`;
  toast.add({severity: 'error', summary: 'Error', group: 'custom', detail: messageTemplate, life: 5000});
}

onMounted(async () => {
  cartItems.value = await apiFetch('/cart-items/');
})
</script>

<template>
<h3>Chose or create delivery</h3>
  <div class="row">
    <div class="col-12">
      <DeliveryAddress @saveAddress="saveAddress" @deleteAddress="deleteAddress" :delivery-page="true" />
    </div>
  </div>
  <div class="row">
    <Divider/>
  </div>
  <div class="row">
    <div class="col-12">
      <h3>Chose shipment type:</h3>
      <span v-if="shipments.length === 0">Select address first</span>
      <Skeleton v-if="shipments.length === 0" width="100%" height="5rem" style="max-width: 700px" ></Skeleton>
    </div>
  </div>
  <div class="row">
    <Divider/>
  </div>
  <div class="row">
    <div class="col-12">
      <div v-if="cartItems.length === 0" style="display: flex; flex-direction: column; align-items: end; width: 100%;">
        <Skeleton width="10rem" height="4rem"></Skeleton>
        <Skeleton width="10rem" height="1rem" style="margin-top: 20px"></Skeleton>
      </div>
      <div v-if="cartItems.length !== 0" style="width: 100%; text-align: right">
        <h3>Order summary:</h3>
        <p>Total: ${{priceTotal}}</p>
        <p>Sales tax: ${{priceTotal * 0.19}}</p>
      </div>
    </div>
  </div>

  <div class="buttons-container">
    <Button label="Back" @click="router.push('cart')" variant="outlined"></Button>
    <Button label="Payment" @click="router.push('delivery')"></Button>
  </div>

  <Toast :baseZIndex="10000"></Toast>
  <Toast group="custom">
    <template #message="slotProps">
      <div>
        <strong>{{ slotProps.message.summary }}</strong>
        <div v-html="slotProps.message.detail" />
      </div>
    </template>
  </Toast>
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
