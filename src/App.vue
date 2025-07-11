<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref, computed, onMounted, nextTick, onActivated, onUpdated} from "vue";
import TieredMenu from 'primevue/tieredmenu';
import {isAuthenticated, logout, signInWithEmailAndPassword, signUp} from "./helpers/auth.js";
import {Dialog} from "primevue";
import {InputText} from "primevue";
import Button from 'primevue/button';
import Toast from "primevue/toast";
import {useToast} from "primevue/usetoast";
import { isLoggedInState, logoutDialog, registerDialog, loginDialog } from "./helpers/store.js";
import FloatLabel from 'primevue/floatlabel';

const router = useRouter();
const toast  = useToast();
const GOOGLE_URL = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=972709788953-raekkg2rqgjh4fj1dlk2c7t4bbeddhfe.apps.googleusercontent.com&redirect_uri=http://site4site.xyz/google/callback/&response_type=code&scope=openid%20email%20profile&access_type=offline';

const menu = ref();
const logoutL = async() => {
  const result = await logout();
  if (result) {
    isLoggedInState.logged = false;
    logoutDialog.visible = false;
    await router.push('/');
  }
}
const logoutC = () => {
  logoutDialog.visible = true;
}
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    link: '/'
  },
  {
    label: 'make formula',
    icon: 'pi pi-palette',
    link: '/mix/1'
  },
  {
    label: 'Consultations',
    icon: 'pi pi-video',
    link: '/consultation'
  },
  {
    label: 'Orders',
    icon: 'pi pi-history',
    link: '/orders-history'
  },
  {
    label: 'Recipes',
    icon: 'pi pi-tags',
    link: '/recipes'
  },
  {
    label: 'Cart',
    icon: 'pi pi-cart-plus',
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

const toggleMenu = (event) => {
  menu.value.toggle(event);
};

const signIn = async () => {
  if (!loginDialog.password || !loginDialog.email) {
    return false;
  }

  const result = await signInWithEmailAndPassword(loginDialog.email, loginDialog.password);
  if (result.ok) {
    loginDialog.visible = false;
    isLoggedInState.logged = true;
  } else {
    showErrors(result.errors);
  }
}

const oauthRedirect = () => {
  window.location.href = GOOGLE_URL;
}

const registerAttempt = async () => {
  if(!(registerDialog.password === registerDialog.password_confirmation && registerDialog.password)) {
    return;
  }
  const attemptResult = await signUp(registerDialog.email, registerDialog.password, registerDialog.password_confirmation);
  if (attemptResult.access) {
    registerDialog.visible = false;
    isLoggedInState.logged = true;
  } else {
    showErrors(attemptResult);
  }
}

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
  isLoggedInState.logged = await isAuthenticated();
})
onUpdated(async () => {
  console.log(isLoggedInState);
})
</script>

<template>
  <div class="header-container">
    <div class="container flex-container">
      <i class="pi pi-align-justify vj-openmob-menu" @click="toggleMenu" style="font-size: 1.5rem; cursor: pointer"></i>
      <span style="font-weight: bold; font-size: 1.2rem">FORMUL<span style="color: crimson">8</span></span>
      <div class="login-container" v-if="!isLoggedInState.logged">
        <div @click.stop="loginDialog.visible=true">Login</div>
        <div @click.stop="registerDialog.visible=true">Register</div>
      </div>
      <router-link to="/profile" v-if="isLoggedInState.logged" ><span class="pi pi-user" style="font-size: 1.5rem; cursor: pointer;"></span></router-link>
    </div>
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

  <div class="container">
    <RouterView />
  </div>


<!--  login dialog-->
  <Dialog v-model:visible="loginDialog.visible" modal class="glass-dialog" header="Sign In" :style="{ width: '25rem' }">
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText type="email" v-model="loginDialog.email" id="email" class="w-100" />
        <label for="email">Email</label>
      </FloatLabel>
    </div>
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText type="password" v-model="loginDialog.password" id="password" class="w-100" />
        <label for="password">Password</label>
      </FloatLabel>
    </div>

    <div class="flex items-center" style="flex-direction: column; gap: 30px">
      <Button type="button" style="width: 100%" label="Sign In" @click="signIn"></Button>
      <div style="color: gray">Dont have account?
        <i
            @click="loginDialog.visible = false; registerDialog.visible = true;"
            style="color: darkblue">Sign Un</i></div>
      <div style="padding: 10px; text-align: center; color: gray">OR</div>
      <Button type="button" @click="oauthRedirect" label="Sign Ip with Google" icon="pi pi-google" variant="outlined"></Button>
    </div>

  </Dialog>
<!--  register dialog-->
  <Dialog v-model:visible="registerDialog.visible" class="glass-dialog" modal header="Sign up" :style="{ width: '25rem' }">
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText type="email" v-model="registerDialog.email" id="email-r" class="w-100" autocomplete="off" />
        <label for="email-r">Email</label>
      </FloatLabel>
    </div>
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText type="password" v-model="registerDialog.password" id="password-r" class="w-100" autocomplete="off" />
        <label for="password-r">Password</label>
      </FloatLabel>
    </div>
    <div class="input-group-flex">
      <FloatLabel variant="on" class="w-100">
        <InputText type="password" v-model="registerDialog.password_confirmation" id="password-r-r" class="w-100" />
        <label for="password-r-r">Password repeat</label>
      </FloatLabel>
    </div>
    <div class="flex items-center" style="flex-direction: column; gap: 30px">
      <Button type="button" style="width: 100%" :disabled="!(registerDialog.password === registerDialog.password_confirmation && registerDialog.password)" label="Sign up" @click="registerAttempt"></Button>
      <div style="color: gray">Already have account?
        <i
            @click="registerDialog.visible = false; loginDialog.visible = true;"
            style="color: darkblue">Sign In</i></div>
      <div style="padding: 10px; text-align: center; color: gray">OR</div>
      <Button type="button" @click="oauthRedirect" label="Sign Up with Google" icon="pi pi-google" variant="outlined"></Button>
    </div>
  </Dialog>

  <!--  logout dialog-->
  <Dialog v-model:visible="logoutDialog.visible" modal class="glass-dialog" header="Logout" :style="{ width: '25rem' }">
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

  <svg width="0" height="0">
    <filter id="frosted"
            x="-20%" y="-20%"
            width="140%" height="140%"
            filterUnits="objectBoundingBox"
            filterRes="300 300"
            primitiveUnits="objectBoundingBox">
      <!-- 1) Низкочастотный шум -->
      <feTurbulence type="fractalNoise"
                    baseFrequency="0.01 0.01"
                    numOctaves="1"
                    seed="1"
                    result="noise"/>
      <!-- 2) Размываем шум, чтобы сделать волны плавными -->
      <feGaussianBlur in="noise"
                      stdDeviation="1.2"
                      result="smoothNoise"/>
      <!-- 3) Смещаем исходное изображение по «гладкому» шуму -->
      <feDisplacementMap id="disp"
                         in="SourceGraphic"
                         in2="smoothNoise"
                         scale="20"
                         xChannelSelector="R"
                         yChannelSelector="G"
                         result="displaced"/>
      <!-- 4) Размываем уже искажённое изображение, чтобы края волн были мягкими -->
      <feGaussianBlur in="displaced"
                      stdDeviation="0.01"
                      result="final"/>
      <!-- 5) Обрезаем до формы оригинала -->
      <feComposite in="final" in2="SourceGraphic" operator="in"/>
      <!-- 6) Анимация усиления эффекта при hover -->
      <animate xlink:href="#disp"
               attributeName="scale"
               from="20" to="40"
               dur="0.3s"
               begin="frosted-box.mouseover"
               fill="freeze"/>
      <animate xlink:href="#disp"
               attributeName="scale"
               from="40" to="20"
               dur="0.3s"
               begin="frosted-box.mouseout"
               fill="freeze"/>
    </filter>
  </svg>



  <svg width="0" height="0">
    <filter id="frosted2"
            x="-20%" y="-20%"
            width="140%" height="140%"
            filterUnits="objectBoundingBox"
            filterRes="300 300"
            primitiveUnits="objectBoundingBox">
      <!-- 1) Низкочастотный шум -->
      <feTurbulence type="fractalNoise"
                    baseFrequency="0.01 0.01"
                    numOctaves="1"
                    seed="1"
                    result="noise"/>
      <!-- 2) Размываем шум, чтобы сделать волны плавными -->
      <feGaussianBlur in="noise"
                      stdDeviation="1.2"
                      result="smoothNoise"/>
      <!-- 3) Смещаем исходное изображение по «гладкому» шуму -->
      <feDisplacementMap id="disp"
                         in="SourceGraphic"
                         in2="smoothNoise"
                         scale="20"
                         xChannelSelector="R"
                         yChannelSelector="G"
                         result="displaced"/>
      <!-- 4) Размываем уже искажённое изображение, чтобы края волн были мягкими -->
      <feGaussianBlur in="displaced"
                      stdDeviation="0.01"
                      result="final"/>
      <!-- 5) Обрезаем до формы оригинала -->
      <feComposite in="final" in2="SourceGraphic" operator="in"/>
      <!-- 6) Анимация усиления эффекта при hover -->
      <animate xlink:href="#disp"
               attributeName="scale"
               from="20" to="40"
               dur="0.3s"
               begin="frosted-box.mouseover"
               fill="freeze"/>
      <animate xlink:href="#disp"
               attributeName="scale"
               from="40" to="20"
               dur="0.3s"
               begin="frosted-box.mouseout"
               fill="freeze"/>
    </filter>
  </svg>
</template>

<style scoped>
.header-container {
  box-shadow: 0 10px 24px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px) saturate(186%);
  -webkit-backdrop-filter: blur(8px) saturate(186%);
  background-color: rgba(170, 60, 200, 0.4);
  border: 1px solid rgba(209, 213, 219, 0.3);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 5;
}

.header-container-glass {
  box-shadow:0 0 0 2px rgba(255,255,255,.6),0 16px 32px rgba(0,0,0,.12);
  backdrop-filter: url(#frosted2);
  -webkit-backdrop-filter: url(#frosted2);
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

.logout-link {
  cursor: pointer;
}


</style>
