<script setup>
import {useRoute, useRouter} from 'vue-router';
import {nextTick, onMounted} from "vue";
import { googleOauth, isAuthenticated } from "../helpers/auth.js";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await googleOauth(route.query.code);
  await router.push('/');
})
</script>

<template>
<h1>Loading........</h1>
</template>

<style scoped>

</style>
