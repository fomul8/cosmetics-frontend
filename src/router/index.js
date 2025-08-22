import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router';
import App from '../App.vue';
import Home from '../components/Home.vue';
import Profile from '../components/Profile.vue';
import Mix from '../components/Mix.vue';
import Consultation from "../components/Consultation.vue";
import OrdersHistory from "../components/OrdersHistory.vue";
import Cart from "../components/Cart.vue";
import Recipes from "../components/Recipes.vue";
import Delivery from "../components/Delivery.vue";
import {computed} from "vue";
import {isAuthenticated, logout} from "../helpers/auth";
import GoogleAuth from "../components/GoogleAuth.vue";

const routes = [
    {path: '/', name: 'home', component: Home},
    {path: '/profile', name: 'profile', component: Profile, meta: {requiresAuth: true}},
    {path: '/orders-history', name: 'orders', component: OrdersHistory, meta: {requiresAuth: true}},
    {path: '/mix/:id', name: 'mix', component: Mix},
    {path: '/consultation', name: 'consultation', component: Consultation},
    {path: '/cart', name: 'cart', component: Cart, meta: {requiresAuth: true}},
    {path: '/recipes', name: 'recipes', component: Recipes, meta: {requiresAuth: true}},
    {path: '/google/callback', name: 'google', component: GoogleAuth},
    {path: '/delivery', name: 'delivery', component: Delivery, meta: {requiresAuth: true}},
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

// Глобальный navigation guard
router.beforeEach(async (to, from, next) => {
    const auth = await isAuthenticated();
    if (to.meta.requiresAuth && !auth) {
        next({name: 'home'}); // перенаправляем на главную, если не аутентифицирован
    } else {
        next();
    }
});

export default router;
