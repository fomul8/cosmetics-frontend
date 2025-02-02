import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import Mix from '../components/Mix.vue';
import Consultation from "../components/Consultation.vue";

const routes = [
    { path: '/', name: 'home', component: Home},
    { path: '/profile', name: 'profile', component: Profile},
    { path: '/mix/:id', name: 'mix', component: Mix},
    { path: '/consultation', name: 'consultation', component: Consultation},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router