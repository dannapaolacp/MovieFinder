<script setup>
// Import libraries
import { ref } from 'vue';
import axios from 'axios';
import TheSpinner from '@/components/TheSpinner.vue';
import TheModal from '@/components/TheModal.vue';
import { checkText } from "../assets/js/validations";

// Reactive state
const query = ref('');
const movies = ref([]);
const selectedMovie = ref(null);
const loading = ref(false);
const showModal = ref(false);

// Methods
/**
 * Methods to fetch movies from API
 */
const getMovies = async (query) => {
    // Update variable loading
    loading.value = true;
    // Promise to wait for API response 
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Define request parameters
    let uri = '/search/movie';
    const options = {
        params: {
            query: query,
            language: 'es-ES',
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
    };
    // Execute request
    await axios
        .get(uri, options)
        .then((response) => {
            if (response.status === 200) {
                movies.value = response.data.results;
                if (movies.value.length === 0) {
                    Swal.fire({
                        title: 'Sin coincidencias',
                        text: `No se encontraron coincidencias para "${query}".`,
                        icon: 'info',
                        confirmButtonText: 'Aceptar'
                    });
                }
            }
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al buscar las películas.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
        .finally(() => {
            loading.value = false;
        });
};

/**
 * Methods to validations
 */
const searchMovies = async () => {
    //Define variables
    const searchQuery = query.value.trim();

    //Conditional to check if the input is empty
    if (searchQuery === '') {
        Swal.fire({
            title: 'Campo vacío',
            text: 'Por favor ingresa una búsqueda.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    //Conditional to check if the input has invalid characters
    if (!checkText(searchQuery)) {
        Swal.fire({
            title: 'Caracteres no permitidos',
            text: 'Por favor, ingresa solo letras y números en tu búsqueda.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    ////Conditional to check if the input does not have enough characters
    if (searchQuery.length > 0 && searchQuery.length <= 2) {
        Swal.fire({
            title: 'Búsqueda demasiado corta',
            text: 'Por favor, ingresa al menos 3 caracteres para realizar la búsqueda.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    //Conditional to send method getMovies
    if (searchQuery.length > 2) {
        await getMovies(searchQuery);
    } else {
        movies.value = [];
    }
};

/**
 * Methods to fetch movie details from API
 */
const fetchMovieDetails = async (id) => {
    // Define request parameters
    let uri = `/movie/${id}`;
    const options = {
        params: {
            language: 'es-ES'
        },
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
        }
    };
    // Execute request
    await axios
        .get(uri, options)
        .then((response) => {
            if (response.status === 200) {
                selectedMovie.value = response.data;
                showModal.value = true;
            }
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al mostrar la película seleccionada.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            })
        })
        .finally(() => {
        })
};

// Computed property to extract year from release date
const getReleaseYear = (releaseDate) => {
    if (!releaseDate) return '';
    return releaseDate.split('-')[0];
};
</script>

<!-- Define template -->
<template>
    <the-spinner v-if="loading" />
    <div class="search-bar">
        <input v-model="query" @keyup.enter="searchMovies" placeholder="Buscar películas..." />
        <button @click="searchMovies"><i class="fa-solid fa-magnifying-glass"></i>&emsp;Buscar</button>
    </div>
    <div class="movies-list" v-if="movies.length">
        <div class="movie-card" v-for="movie in movies" :key="movie.id" @click="fetchMovieDetails(movie.id)">
            <img class="movie-poster" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" alt="Poster" />
            <div class="movie-info">
                <h3>{{ movie.title }}</h3>
                <p>Lanzamiento: {{ getReleaseYear(movie.release_date) }}</p>
            </div>
        </div>
    </div>
    <the-modal :movie="selectedMovie" :show="showModal" @close="showModal = false" />
</template>