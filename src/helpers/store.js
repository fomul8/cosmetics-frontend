// import { defineStore } from 'pinia';
import {reactive, ref} from "vue";
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
const loginDialog = reactive({visible: false, email: '', password: ''});
const registerDialog = reactive({
    visible: false,
    email: '',
    password: '',
    password_confirmation: '',
});
const logoutDialog = reactive({
    visible: false,
});

export {isLoggedInState, logoutDialog, registerDialog, loginDialog};
