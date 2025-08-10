<script setup>

import {computed, ref, onMounted} from "vue";
import {useRoute, useRouter} from 'vue-router';
import Divider from "primevue/divider";
import Select from 'primevue/select';
import RecpItem from "./parts/RecpItem.vue";
import Button from "primevue/button";
import { apiFetch } from "../helpers/api.js";
import Slider from 'primevue/slider';

const route = useRoute();
const router = useRouter();
const cartItems = ref([]);
const suggestRecipes = ref([]);

const volumes = ref([]);

const priceTotal = computed(() => {
  return cartItems.value.reduce( (accumulator, currentValue) => accumulator + currentValue.total_price, 0)
});


const addVal = (qtyVal) => {
  console.log(qtyVal);
  if (qtyVal.quantity  < 10) {
    qtyVal.quantity  += 1;
    qtyVal['total_price'] = qtyVal.quantity * qtyVal['item_price'];
  }
}

const decreaseVal = (qtyVal) => {
  if (qtyVal.quantity  >=2) {
    qtyVal.quantity  = qtyVal.quantity  - 1;
    qtyVal['total_price'] = qtyVal.quantity * qtyVal['item_price'];
  }
}

const addSuggestion = async suggest => {
  if (suggest.source === 'user') {
    await apiFetch(`/cart-items/?u-recipe-id=${suggest.id}`, {
      method: 'POST',
    });
  } else {
    //presets/<int:standard_id>/copy
    const result = await apiFetch(`/presets/${suggest.id}/copy`, {
      method: 'POST',
    });
    if (result.id) {
      await apiFetch(`/cart-items/?u-recipe-id=${result.id}`, {
        method: 'POST',
      });
    }
  }
  cartItems.value = await apiFetch('/cart-items/');
  suggestRecipes.value = await apiFetch('/suggestions');
}

const updateVolumes = item => {
  cartItems.value.forEach(itemF => {
    itemF.item_price = itemF.pack_volume.price;
    itemF.total_price = itemF.item_price * itemF.quantity;
  })
}

const deleteItem = async (item) => {
  if (window.confirm("Are you sure you want to delete this item?")) {
    const idx = cartItems.value.findIndex(obj => obj.id === item.id);
    if (idx !== -1) {
      cartItems.value.splice(idx, 1);
    }

    try {
      await apiFetch(`/cart-items/item/${item.id}/`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.log(error);
    }
  }
}

onMounted(async () => {
  if (route.query.new) {
    await apiFetch(`/cart-items/?u-recipe-id=${route.query.new}`, {
      method: 'POST',
    });
  }
  cartItems.value = await apiFetch('/cart-items/');
  volumes.value = await apiFetch('/pack-volumes/');
  suggestRecipes.value = await apiFetch('/suggestions');

});

</script>

<template>
<div class="row" style="margin-bottom: 30px">
  <div class="col-12"><h3>Order items:</h3></div>
</div>

<div class="row">
  <div class="col-12 col-md-5">
    <!--  Items -->
    <div class="row" v-for="item in cartItems">
      <div class="col-8">
        <span style="color: #aa3cc8; margin-bottom: 10px;"><b>{{item.recipe.label}}</b></span>
        <div style="display: flex;flex-direction: column; gap: 20px">
          <div style="display: flex; overflow: hidden; align-items: baseline; justify-content: space-between;">

            <span>Volume</span>
            <Select @change="updateVolumes(item)" v-model="item['pack_volume']" size="small" :options="volumes" optionLabel="label" placeholder="pack vol" class="w-full md:w-56" />
          </div>
          <div style="display: flex; overflow: hidden; align-items: baseline;  justify-content: space-between;">
            <span>Qty:</span>
            <div style="display: flex; justify-content: space-around; align-items: baseline; gap: 20px">
              <i class="pi pi-minus-circle" @click="decreaseVal(item)" style="font-size: 1.3rem; cursor: pointer"></i>
              <div>{{ item.quantity }}</div>
              <i class="pi pi-plus-circle" @click="addVal(item)" style="font-size: 1.3rem; cursor: pointer"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="col-4">
        <p style="font-size: 1.1rem; font-weight: bold">$ {{item.item_price}}/per can</p>
        <p><i class="pi pi-trash" style="color: #ff6b5f" @click="deleteItem(item)"></i></p>
      </div>
      <Divider/>
    </div>

  </div>
  <div class="col-12 col-md-7">
    <div style="width: 100%; text-align: right">
      <h3>Order summary:</h3>
      <p>Subtotal: ${{priceTotal}}</p>
      <p>Sales tax: ${{priceTotal * 0.19}}</p>
    </div>
  </div>
</div>


  <h3 style="margin-top: 50px">Add to order</h3>
  <div class="row" style="margin-bottom: 60px">
    <div v-for="suggest in suggestRecipes" class="col-6 col-md-3">
      <recp-item @add-suggestion="addSuggestion" :suggest="suggest"/>
    </div>
  </div>

  <div class="buttons-container">
    <Button label="Create more" @click="router.push('mix/1')" variant="outlined"></Button>
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
