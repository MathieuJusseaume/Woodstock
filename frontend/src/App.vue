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
import { useConnectedUserStore } from "./stores/connectedUserStore";

export default {
    name: 'App',
    components: {
         RouterView,
        LoaderSpinnerCpt
    },
    computed: {
        isLoading() {
            const utilsStore = useUtilsStore();
            useConnectedUserStore();
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
    margin: 0;
}
</style>
