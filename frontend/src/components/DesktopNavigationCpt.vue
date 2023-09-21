<template>
    <nav class="desktopnavigation__nav">
       <router-link class="desktopnavigation__nav__link__clients" to="/clients">Clients</router-link>

       <button class="desktopnavigation__nav__button__clients-new" @click="openClientCreationModal" >Création client</button>

       <router-link class="desktopnavigation__nav__link__commands" to="/commandes">Commandes</router-link>

       <button class="desktopnavigation__nav__button__commands-new">Création commande</button>
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
        }
    },
};
</script>
