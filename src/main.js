import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

const app = createApp(App)

app.use(router)
app.provide("store", store)
app.mount('#app')
