<template>
    <div>
        <HeaderCpt />
        <DesktopNavigationCpt v-if="!formName"/>
        <RouterView v-if="!formName"/>
        <ModalFormLayoutCpt v-if="formName"/>
    </div>
</template>

<script>
import { RouterView } from "vue-router";
import ModalFormLayoutCpt from "@/components/forms/ModalFormLayoutCpt.vue";
import DesktopNavigationCpt from "@/components/DesktopNavigationCpt.vue";
import { useUtilsStore } from "../stores/utilsStore.js";
import HeaderCpt from "@/components/HeaderCpt.vue";
export default {
    name: "LayoutView",
    components: {
        RouterView,
        ModalFormLayoutCpt,
        DesktopNavigationCpt,
        HeaderCpt
    },
    // formName sera une valeur a récupérer dans l'un de nos store
    computed: {
        formName() {
            const utilsStore = useUtilsStore();
            return utilsStore.getFormName;
        }
    }

};
</script>

<style scoped></style>