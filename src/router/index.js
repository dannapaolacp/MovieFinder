//Import libraries
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

//Define routes
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "",
            component: HomeView,
            meta: { title: 'Buscador de Peliculas' }
        },
        {
            path: "/home",
            name: "home",
            component: HomeView,
            meta: { title: 'Detalles de Peliculas' }
        },
    ],
});

export default router