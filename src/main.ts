import 'virtual:uno.css'

// import { VjInit } from 'vue-jenga/utils'

import { createApp } from 'vue'
import './style.css'
// import 'vue-jenga/vue-jenga.css'
import App from './App.vue'

// import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia'

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

VjInit();


