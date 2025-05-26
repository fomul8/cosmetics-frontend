// import { defineStore } from 'pinia';
import {reactive} from "vue";
//
// const authStore = defineStore('auth', {
//     state: () => ({
//         accessToken: sessionStorage.getItem('jwt') || null,
//         isLoggedIn: false,
//         user: null,
//     }),
//
// });

const isLoggedInState = reactive({logged: false});

export {isLoggedInState};
