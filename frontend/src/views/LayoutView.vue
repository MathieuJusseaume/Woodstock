<template>
    <div>
        <h1>Ici c'est le LAYOUT</h1>
        <RouterView />
        <ModalFormLayoutCpt v-if="formName"/>
    </div>
</template>

<script>
import { RouterView } from "vue-router";
import { ModalFormLayoutCpt } from "@/components/forms/ModalFormLayoutCpt.vue";
export default {
    name: "LayoutView",
    components: {
        RouterView,
        ModalFormLayoutCpt,
    },
    // formName sera une valeur a récupérer dans l'un de nos store

};
</script>

<style scoped></style>