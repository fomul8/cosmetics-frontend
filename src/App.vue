<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref, computed, onMounted, nextTick, onActivated} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import {isAuthenticated, logout, signInWithEmailAndPassword, signUp} from "./helpers/auth.js";
import {Dialog} from "primevue";
import {InputText} from "primevue";
import Button from 'primevue/button';
import Toast from "primevue/toast";
import {useToast} from "primevue/usetoast";

const router = useRouter();
const toast  = useToast();
const GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=972709788953-raekkg2rqgjh4fj1dlk2c7t4bbeddhfe.apps.googleusercontent.com&redirect_uri=http://site4site.xyz/google/callback/&response_type=code&scope=openid%20email%20profile&access_type=offline';

const menu = ref();
let isLoggedIn = ref(false);
const logoutL = async() => {
  const result = await logout();
  if (result) {
    isLoggedIn.value = false;
    await router.push('/');
  }
}
const logoutC = () => {
  logoutDialog.value.visible = true;
}
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    link: '/'
  },
  {
    label: 'Consultations',
    icon: 'pi pi-video',
    link: '/consultation'
  },
  {
    label: 'Orders',
    icon: 'pi pi-tags',
    link: '/orders-history'
  },
  {
    label: 'Cart',
    icon: 'pi pi-cart',
    link: '/cart'
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-share-alt',
    class: 'logout-link',
    command: logoutC
  }
]);
const loginDialog = ref({
  visible: false,
});
const registerDialog = ref({
  visible: false,
  email: '',
  password: '',
  password_confirmation: '',
});
const logoutDialog = ref({
  visible: false,
});



const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const signIn = async () => {
  if (!loginDialog.value.password || !loginDialog.value.email) {
    return false;
  }

  const result = await signInWithEmailAndPassword(loginDialog.value.email, loginDialog.value.password);
  if (result) {
    loginDialog.value.visible = false;
    isLoggedIn.value = true;
    await router.push('/');
  }
}

const oauthRedirect = () => {
  window.location.href = GOOGLE_URL;
}

const registerAttempt = async () => {
  if(!(registerDialog.value.password === registerDialog.value.password_confirmation && registerDialog.value.password)) {
    return;
  }
  const attemptResult = await signUp(registerDialog.value.email, registerDialog.value.password, registerDialog.value.password_confirmation);
  if (attemptResult.access) {
    registerDialog.value.visible = false;
    isLoggedIn.value = true;
    await router.push('/');
  } else {
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
}

onMounted(async () => {
  setTimeout(async () => {
    isLoggedIn.value = await isAuthenticated();
  }, 1000)
});
</script>

<template>
  <div class="header-container">
    <div class="container flex-container">
      <i class="pi pi-align-justify vj-openmob-menu" @click="toggleMenu" style="font-size: 1.5rem; cursor: pointer"></i>
      <div class="login-container" v-if="!isLoggedIn">
        <div @click="loginDialog.visible=true">Login</div>
        <div @click="registerDialog.visible=true">Register</div>
      </div>
      <router-link to="/profile" v-if="isLoggedIn" ><span class="pi pi-user" style="font-size: 1.5rem; cursor: pointer;"></span></router-link>

      <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
        <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.link" :to="item.link" style="padding: 10px; display: flex; justify-content: flex-start; align-items: baseline; gap: 10px;">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </router-link>
          <div v-else @click="item.command" style="padding: 10px; display: flex; justify-content: flex-start; align-items: baseline; gap: 10px;">
            <span :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </div>
        </template>
      </TieredMenu>
    </div>
  </div>

  <div class="container">
    <RouterView />
  </div>


<!--  login dialog-->
  <Dialog v-model:visible="loginDialog.visible" modal header="Login" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Sign in to your account</span>
    <div class="input-group-flex">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText type="email" v-model="loginDialog.email" id="email" class="w-100" />
    </div>
    <div class="input-group-flex">
      <label for="password" class="font-semibold w-24">Password</label>
      <InputText type="password" v-model="loginDialog.password" id="password" class="w-100" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="loginDialog.visible = false"></Button>
      <Button type="button" label="Sign in" @click="signIn"></Button>
    </div>
    <div style="padding: 10px; text-align: center; color: gray">OR</div>
    <div class="flex items-center">
      <Button type="button" @click="oauthRedirect" label="Google"></Button>
    </div>
  </Dialog>
<!--  register dialog-->
  <Dialog v-model:visible="registerDialog.visible" modal header="Login" :style="{ width: '25rem' }">
    <span style="margin-bottom: 30px">Sign up</span>
    <div class="input-group-flex">
      <label for="email-r" class="font-semibold w-24">Email</label>
      <InputText type="email" v-model="registerDialog.email" id="email-r" class="w-100" autocomplete="off" />
    </div>
    <div class="input-group-flex">
      <label for="password-r" class="font-semibold w-24">Password</label>
      <InputText v-model="registerDialog.password"  id="password-r" class="w-100" autocomplete="off" />
    </div>
    <div class="input-group-flex">
      <label for="password-r-r" class="font-semibold w-24">repeat password</label>
      <InputText v-model="registerDialog.password_confirmation" id="password-r-r" class="w-100" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4">
      <Button type="button" label="Cancel" severity="secondary" @click="registerDialog.visible = false"></Button>
      <Button type="button" :disabled="!(registerDialog.password === registerDialog.password_confirmation && registerDialog.password)" label="Sign up" @click="registerAttempt"></Button>
    </div>
    <div style="padding: 10px; text-align: center; color: gray">OR</div>
    <div class="flex items-center">
      <Button type="button" @click="oauthRedirect" label="Google"></Button>
    </div>
  </Dialog>

  <!--  logout dialog-->
  <Dialog v-model:visible="logoutDialog.visible" modal header="Logout" :style="{ width: '25rem' }">
    <div style="margin-bottom: 30px; text-align: center">Are you realy want to logout?</div>

    <div class="flex items-center gap-4">
      <Button type="button" label="Cancel" severity="secondary" @click="logoutDialog.visible = false"></Button>
      <Button type="button" label="Yes" @click="logoutL"></Button>
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
.header-container {
  border-bottom: 1px solid var(--p-primary-500);
  width: 100%;
  position: sticky;
}

.container {
  padding: 20px;
  max-width: 1280px;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-container {
  display: flex;
  gap: 20px;
  cursor: pointer;
}

.input-group-flex {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 3px;
  margin-bottom: 30px;
}

.logout-link {
  cursor: pointer;
}


</style>
