<template>
    <nav class="desktopnavigation__nav">
       <router-link class="desktopnavigation__nav__link" to="/clients">Clients</router-link>

       <a class="desktopnavigation__nav__link" @click="openClientCreationModal" >Création client</a>

       <router-link class="desktopnavigation__nav__link" to="/commandes">Commandes</router-link>

       <a class="desktopnavigation__nav__link" @click="openOrderCreationModal">Création commande</a>
    </nav>
</template>

<script>
import { useUtilsStore } from "@/stores/utilsStore";

export default {
    name: "DesktopNavigationCpt",
    data() {
        return {};
    },
    methods: {
        openClientCreationModal() {
            const utilsStore = useUtilsStore();
            utilsStore.setFormName("CreateClientForm");
        },
        openOrderCreationModal() {
            const utilsStore = useUtilsStore();
            utilsStore.setFormName("CreateOrderForm");
        }
    },
};
</script>

<style scoped>
.desktopnavigation__nav {
    margin: 2.5rem;
    height: fit-content;
}
.desktopnavigation__nav__link {
    padding: 1rem;
    border: solid 2px black;
    color: black;
    text-decoration: none;
    font-weight: 600;
    margin: .5rem;
    text-transform: capitalize;
    cursor: pointer;
    user-select: none;
    transition: .2s;
}
</style>