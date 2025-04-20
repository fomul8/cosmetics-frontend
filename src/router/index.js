import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router';
import App from '../App.vue';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import Mix from '../components/Mix.vue';
import Consultation from "../components/Consultation.vue";
import OrdersHistory from "../components/OrdersHistory.vue";
import {computed} from "vue";
import {isAuthenticated, logout} from "../helpers/auth";

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/profile', name: 'profile', component: Profile, meta: {requiresAuth: true}},
    {path: '/orders-history', name: 'orders', component: OrdersHistory, meta: {requiresAuth: true}},
    {path: '/mix/:id', name: 'mix', component: Mix},
    {path: '/consultation', name: 'consultation', component: Consultation},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// Глобальный navigation guard
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next({name: 'home'}); // перенаправляем на главную, если не аутентифицирован
    } else {
        next();
    }
});

export default router;
