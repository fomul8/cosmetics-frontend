<script setup>
import Card from 'primevue/card';
import ProgressBar from 'primevue/progressbar';
import InputGroup from 'primevue/inputgroup';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import InputGroupAddon from 'primevue/inputgroupaddon';
import {apiFetch} from "../helpers/api.js";


import DeliveryAddress from "./parts/DeliveryAddress.vue";
import {onMounted, ref} from "vue";
import Button from "primevue/button";
import {Dialog} from "primevue";
import FloatLabel from "primevue/floatlabel";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";
import {useRouter} from "vue-router";
const toast  = useToast();
const router = useRouter();

const userObject = ref({});
const changePasswordDialog = ref({
  visible: false,
  password: '',
  passwordRepeat: ''
})
const editInfoDialog = ref({
  visible: false,
})

const changePass =  async() => {
  if (!changePasswordDialog.value.password || !changePasswordDialog.value.passwordRepeat) {
    return false;
  }
  let result;

  try {
    result = await apiFetch('/auth/password/change/', {
      method: 'POST',
      body: {
        'new_password1': changePasswordDialog.value.password,
        'new_password2': changePasswordDialog.value.passwordRepeat
      }
    }, true);
    if (result.ok) {
      changePasswordDialog.value.visible = false;
      toast.add({severity: 'secondary', summary: 'Changed', detail: 'You changed your password', life: 5000});
    } else {
      showErrors(result.errors);
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

onMounted(async () => {
  userObject.value = await apiFetch('/users/me/', {}, true);
})

const scoreValue = 43;
</script>

<template>
  <div class="row">
    <div class="col-12 mb-on-s">
      <h3>PROFILE</h3>
    </div>
  </div>
<div class="row">
<!--  User base info-->
  <div class="col-12 col-md-3 mb-on-s">
    <Card class="glass-card">
      <template #title>Info</template>
      <template #content>
        <p class="m-0">
          Account created: 24.3.2025
        </p>
        <p>
          ID #{{userObject.id}}
        </p>
        <p>Login: {{userObject.login ?? '---'}}</p>
        <p>Science score:</p>
        <ProgressBar :value="scoreValue"></ProgressBar>
      </template>
    </Card>
  </div>

  <div class="col-12 col-md-9 mb-on-s">
    <Card style="position: relative" class="glass-card">
      <template #title>Security</template>
      <template #content>
        <p class="m-0">
          Email: {{userObject.email}}
        </p>
        <p>
          Password: *********
        </p>
        <div class="edit-corner-btn" @click="changePasswordDialog.visible = true;">
          <i class="pi pi-cog"></i>
        </div>
      </template>
    </Card>
  </div>
</div>
  <div class="row">
    <div class="col-12 col-md-3"></div>
    <DeliveryAddress @saveAddress="saveAddress" @deleteAddress="deleteAddress" />
  </div>

  <!--  change password dialog-->
  <Dialog v-model:visible="changePasswordDialog.visible" modal class="glass-dialog" header="Change password" :style="{ width: '25rem' }">
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText v-model="changePasswordDialog.password" id="password" class="w-100" />
        <label for="password">Password</label>
      </FloatLabel>
    </div>
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText v-model="changePasswordDialog.passwordRepeat" id="password-repeat" class="w-100" />
        <label for="password-repeat">Repeat Password</label>
      </FloatLabel>
    </div>

    <div class="flex items-center" style="flex-direction: column; gap: 30px">
      <Button type="button" style="width: 100%" label="Change" @click="changePass"></Button>
    </div>

  </Dialog>

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

@media (max-width: 768px) {
  .mb-on-s {
    margin-bottom: 20px;
  }

  .column-on-s {
    flex-direction: column;
  }
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

</style>
