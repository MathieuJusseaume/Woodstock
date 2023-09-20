<template>
    <div>
        <h1>Ici c'est le LAYOUT</h1>
        <RouterView />
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
export default {
    name: "LayoutView",
    components: {
        RouterView,
    },

};
</script>

<style scoped></style>