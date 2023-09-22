<template>
    <div class="application">
        <RouterView v-show="!isLoading" />
        <LoaderSpinnerCpt v-show="isLoading" />
    </div>
</template>

<script>
import { RouterView } from "vue-router";
import LoaderSpinnerCpt from "@/components/LoaderSpinnerCpt.vue";
import { useUtilsStore } from "./stores/utilsStore";

export default {
    name: 'App',
    components: {
         RouterView,
        LoaderSpinnerCpt
    },
    computed: {
        isLoading() {
            const utilsStore = useUtilsStore();
            return utilsStore.getIsLoading;
        }
    }

};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
