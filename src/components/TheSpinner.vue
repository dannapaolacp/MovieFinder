<!-- Define template -->
<template>
    <div class="spinner-box">
        <div class="spinner">
            <img src="../assets/img/LogoSpinner.png" alt="Loading..." class="spinner-logo" />
        </div>
    </div>
</template>

<!-- Define styles -->
<style scoped>
/* spinner container */
.spinner-box {
    background-color: rgba(255, 255, 255, 0.5);
    height: 100vh;
    width: 100vw;
    left: 0;
    padding: 0;
    position: fixed;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.spinner-box .spinner {
    z-index: 10000;
}

/* spinner logo */
.spinner-logo {
    width: 200px;
    height: auto;
    animation: blink-animation 1.5s infinite;
}

/* keyframes for blinking animation */
@keyframes blink-animation {
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
}
</style>