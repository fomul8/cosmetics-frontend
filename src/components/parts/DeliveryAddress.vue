<script setup>
import {computed, defineEmits, onMounted, ref} from "vue";
import { MAX_ADDRESSES_SAVED } from "../../constants/constants.js";
import Select from 'primevue/select';
import Button from "primevue/button";
import {InputText} from "primevue";
import {Message} from "primevue";
import {apiFetch} from "../../helpers/api.js";
const emit = defineEmits(['saveAddress', 'deleteAddress', 'checkAddress']);
const isDeliveryPage = defineProps(['deliveryPage']);

const addresses = ref([]);

const newAddress = ref({
  visible: false,
})

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

const currentAddressModification = ref({
  id: null,
  'first_name': "",
  'last_name': "",
  'company_name': "",
  'address_string_1': "",
  'address_string_2': "",
  'city': "",
  'state': "",
  'post_code': '',
  'phone_number': '',
  'delivery_instructions': ''
});

const editAddress = address => {
  if (currentAddressModification.value.id === address.id) {
    currentAddressModification.value = {};
    newAddress.value.visible = false;
    return;
  }
  currentAddressModification.value = address;
  newAddress.value.visible = true;
}

const openNewAddress = () => {
  if (newAddress.value.visible) {
    newAddress.value.visible = false;
    return;
  }
  currentAddressModification.value = {};
  newAddress.value.visible = true;
}
const saveAddress = () => {
  emit('saveAddress', currentAddressModification.value);
}

const deleteAddress = async () => {
  if (window.confirm("Are you sure you want to delete this address?")) {
    emit('deleteAddress', currentAddressModification.value);
    const idx = addresses.value.findIndex(obj => obj.id === currentAddressModification.value.id);
    if (idx !== -1) {
      addresses.value.splice(idx, 1);
    }
    currentAddressModification.value = {};
    newAddress.value.visible = false;
  }
}

const checkAddress = async (adr) => {
  currentAddressModification.value = adr;
  emit('checkAddress', currentAddressModification.value);
}

onMounted(async () => {
  addresses.value = await apiFetch('/users/delivery');
  if (isDeliveryPage && addresses.value.length > 0) {
    currentAddressModification.value = addresses.value[0];
  }
})
</script>

<template>
  <h3 style="margin-top: 50px">Delivery:</h3>
  <div style="display: flex; gap: 10px; align-items: stretch; flex-wrap: wrap">
    <div v-if="isDeliveryPage" v-for="address in addresses" @click="checkAddress(address)" class="delivery-card" style="min-width: 180px">
      <div style="z-index: 10"><i class="pi pi-home"></i> <b>home</b></div>
      <div style="z-index: 10">{{address.city}} {{address.address_string}}</div>
      <div style="z-index: 10">ZIP {{address.post_code}}</div>
      <div :class="`map-icon-box ${currentAddressModification.id === address.id ? '' : 'map-icon-box-gray'}`"></div>
      <div v-if="currentAddressModification.id === address.id" class="checked-corner-btn">
        <i class="pi pi-map-marker"></i>
      </div>
    </div>

    <div v-if="!isDeliveryPage" v-for="address in addresses" class="delivery-card" style="min-width: 180px">
      <div style="z-index: 10"><i class="pi pi-home"></i> <b>home</b></div>
      <div style="z-index: 10">{{address.city}} {{address.address_string}}</div>
      <div style="z-index: 10">ZIP {{address.post_code}}</div>
      <div class="map-icon-box"></div>
      <div class="edit-corner-btn" @click="editAddress(address)">
        <i class="pi pi-cog"></i>
      </div>
    </div>

    <div v-if="!addresses.length"  class="delivery-card" @click="openNewAddress">
      <div style="z-index: 10"><i class="pi pi-home"></i> <b></b></div>
      <div style="z-index: 10">No saved addresses yet</div>
      <div style="z-index: 10"></div>
      <div class="map-icon-box" style="filter: grayscale(100%) brightness(70%);"></div>
      <div class="edit-corner-btn" style="filter: grayscale(100%) brightness(70%);">
        <i class="pi pi-cog"></i>
      </div>
    </div>

    <div v-if="addresses.length < MAX_ADDRESSES_SAVED" class="delivery-card" @click="openNewAddress" style="justify-content: center">
      <i class="pi pi-plus" v-if="!newAddress.visible" style="font-size: 1.2rem; color: #aa3cc8;"></i>
      <i class="pi pi-minus" v-if="newAddress.visible" style="font-size: 1.2rem; color: #aa3cc8;"></i>
    </div>
  </div>
  <div class="delivery-card" v-if="newAddress.visible" style="margin-top: 30px;">
    <p v-if="!currentAddressModification.id">New delivery address</p>
    <p v-if="currentAddressModification.id">Edit delivery address</p>
    <div class="edit-corner-btn edit-corner-btn--danger" v-if="currentAddressModification.id" @click="deleteAddress">
      <i class="pi pi-trash"></i>
    </div>
    <div class="new-addr-row">
      <label for="first-name">First Name</label>
      <InputText id="first-name" v-model="currentAddressModification['first_name']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="last-name">Last Name</label>
      <InputText id="last-name" v-model="currentAddressModification['last_name']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="company">Company</label>
      <InputText id="company" v-model="currentAddressModification['company_name']" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div class="new-addr-row">
      <label for="addr-1">Address Line 1</label>
      <InputText id="addr-1" v-model="currentAddressModification['address_string_1']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="addr-2">Address Line 2</label>
      <InputText id="addr-2" v-model="currentAddressModification['address_string_2']" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div class="new-addr-row">
      <label for="state">State</label>
      <Select :options="states" v-model="currentAddressModification['state']" option-value="name" optionLabel="name" placeholder="Select a state"></Select>
    </div>
    <div class="new-addr-row">
      <label for="city">City</label>
      <InputText id="city" v-model="currentAddressModification['city']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="zip">ZIP code</label>
      <InputText id="zip" v-model="currentAddressModification['post_code']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="phone">Phone number</label>
      <InputText id="phone" v-model="currentAddressModification['phone_number']" aria-describedby="username-help" />
    </div>
    <div class="new-addr-row">
      <label for="instructions">Delivery Instructions</label>
      <InputText id="instructions" v-model="currentAddressModification['delivery_instructions']" aria-describedby="username-help" />
      <Message size="small" severity="secondary" variant="simple">Optional</Message>
    </div>
    <div style="display: flex; justify-content: center; padding: 20px">
      <Button @click="saveAddress" label="Save" style="width: 100%" severity="outlined"></Button>
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
  background-color: white;
  overflow: hidden;
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

.edit-corner-btn {
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #daabe7;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.checked-corner-btn {
  position: absolute;
  top:0;
  right: 0;
  border-bottom-left-radius: 80%;
  border-top-right-radius: 6px;
  background-color: #42b998;
  width: auto;
  padding: 8px 10px 8px 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

.map-icon-box-gray {
  filter: grayscale(100%) brightness(70%);
}

.edit-corner-btn--danger {
  background-color: #ff6b5f;
}
</style>
