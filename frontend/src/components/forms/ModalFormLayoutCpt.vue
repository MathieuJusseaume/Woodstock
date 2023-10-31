<template>
    <div class="formLayout">
        <header class="formLayout__header">
            <h1 class="formLayout__title">{{ formName }}</h1>
            <button class="formLayout__closebutton" @click="closeModal">fermer le formulaire</button>
        </header>

        <!-- Switch "editCommand -> <EDtidCOmmandeform" -->
        <!-- Pour le login form puisqu pas la même tronche pas besoin du header -> le faire seul ? -->

        <ClientFormCpt v-if="formName === 'CreateClientForm' || formName === 'EditClientForm'" />
        <CreateOrderFormCpt v-if="formName === 'Création de commande'" />
        <UpdateOrderFormCpt v-if="formName === 'Modification de commande'" />
        <AccountFormCpt v-if="formName === 'Modification du compte'" />

    </div>
</template>

<script>
import ClientFormCpt from "@/components/forms/ClientFormCpt.vue";
import CreateOrderFormCpt from "@/components/forms/CreateOrderFormCpt.vue";
import { useClientsStore } from "@/stores/clientsStore";
import { useUtilsStore } from "@/stores/utilsStore";
import AccountFormCpt from './AccountFormCpt.vue';
import UpdateOrderFormCpt from "./UpdateOrderFormCpt.vue";

export default {
    name: "ModalFormLayoutCpt",
    components: {
    ClientFormCpt,
    AccountFormCpt,
    CreateOrderFormCpt,
    UpdateOrderFormCpt
},
    computed: {
        formName() {
            const utilsStore = useUtilsStore();
            return utilsStore.getFormName;
        }
    },
    updated() {
        const clientStore = useClientsStore();
        const utilsStore = useUtilsStore();
        console.log(utilsStore.getFormName);
        if(utilsStore.getFormName === "CreateClientForm") {
            clientStore.resetform();
        }
    },
/*     props: {
        formName: {
            type: String,
            required: true
        }
    }, */
    data() {
        return {
            infos: ""
        }
    },
    methods: {
        closeModal() {
            const utilsStore = useUtilsStore();
            utilsStore.setFormName("");
        }
    },

};
</script>

<style>

</style>