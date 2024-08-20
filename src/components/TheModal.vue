<script setup>
// Import libraries
import { ref, watch } from 'vue';

// Props
const props = defineProps({
    movie: {
        type: Object,
        required: true
    },
    show: {
        type: Boolean,
        required: true
    }
});

// Emits
const emit = defineEmits(['close']);

// Local state
const isClosing = ref(false);

// Watcher
watch(() => props.show, (newValue) => {
    if (!newValue) {
        isClosing.value = true;
        setTimeout(() => {
            isClosing.value = false;
            emit('close');
        }, 500);
    }
});

// Methods
/**
 * Method to handle clicks outside the modal-content
 */
const handleModalClick = (event) => {
    if (event.target === event.currentTarget) {
        emit('close');
    }
};
</script>

<!-- Define template -->
<template>
    <div class="modal" v-if="props.show || isClosing" :class="{ 'closing': isClosing }" @click.self="handleModalClick">
        <div class="modal-content">
            <span class="close" @click="emit('close')">&times;</span>
            <h2>{{ props.movie.title }}</h2>
            <div class="img-content">
                <img class="movie-backdrop" :src="'https://image.tmdb.org/t/p/w500' + props.movie.backdrop_path"
                alt="Backdrop" />
            </div>
            <p><strong>Sinopsis:</strong> {{ props.movie.overview }}</p>
            <p><strong>Fecha de lanzamiento:</strong> {{ props.movie.release_date }}</p>
            <p><strong>Popularidad:</strong> <i class="fa-solid fa-star" style="color: #fcfc00;"></i> {{ props.movie.vote_average }} / 10</p>
        </div>
    </div>
</template>