<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router';
import {ref, computed, onMounted, nextTick} from "vue";
import TieredMenu from 'primevue/tieredmenu';

const router = useRouter();

const menu = ref();
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
    label: 'Recipes',
    icon: 'pi pi-tags',
    link: '/recipes'
  },
  {
    separator: true
  },
  {
    label: 'Logout',
    icon: 'pi pi-share-alt'
  }
]);

const toggleMenu = (event) => {
  menu.value.toggle(event);
};
</script>

<template>
  <div class="header-container">
    <i class="pi pi-align-justify vj-openmob-menu" @click="toggleMenu" style="font-size: 1.5rem; cursor: pointer"></i>
    <router-link to="/profile"><span class="pi pi-user" style="font-size: 1.5rem; cursor: pointer;"></span></router-link>
    <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup>
      <template #item="{ item, props, hasSubmenu }">
        <router-link v-if="item.link" :to="item.link" v-ripple style="padding: 10px; display: flex; justify-content: flex-start; align-items: baseline; gap: 10px;">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </router-link>
      </template>
    </TieredMenu>
  </div>
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--p-primary-500);
  width: 100%;
  align-items: center;
  position: sticky;
}

.container {
  padding: 20px;
  max-width: 1280px;
}
</style>
