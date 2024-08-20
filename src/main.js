//Import libraries
import "@/assets/css/global-dist.css";
import axios from "axios";
import router from "@/router";
import { createApp } from 'vue'
import App from './App.vue'

// Axios URL
axios.defaults.baseURL = "https://api.themoviedb.org/3"

const app = createApp(App);

// Use router
app.use(router);

// Mount the app
app.mount("#app");