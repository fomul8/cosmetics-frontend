<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref, computed, onMounted, nextTick} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import {isAuthenticated, logout, signInWithEmailAndPassword} from "./helpers/auth.js";
import {Dialog} from "primevue";
import {InputText} from "primevue";
import Button from 'primevue/button';

const router = useRouter();

const menu = ref();
const isLoggedIn = ref(isAuthenticated());
const logoutL = async() => {
  const result = await logout();
  console.log(result);
  console.log(localStorage.getItem('jwt'));
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
  // {
  //   label: 'Recipes',
  //   icon: 'pi pi-tags',
  //   link: '/recipes'
  // },
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
      <Button type="button" :disabled="!(registerDialog.password === registerDialog.password_confirmation && registerDialog.password)" label="Sign up" @click="registerDialog.visible = false"></Button>
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
