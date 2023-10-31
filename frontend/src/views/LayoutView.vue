<template>
    <div>
        <HeaderCpt />
        <main class="main__layout">
            <DesktopNavigationCpt />
            <div class="main__layout__content">
                <RouterView />
                <ModalFormLayoutCpt v-if="formName" />
            </div>

        </main>

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
<style scoped>
.main__layout{
    display: flex;
    justify-content: flex-start;
}</style>