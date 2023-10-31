<template>
    <div class="clientpanelinfo">
        <div class="clientpanelinfo__list">
            <p v-show="succes">{{ succes }}</p>
            <p v-show="errors.errorMessage">{{ errors.errorMessage }}</p>
            <ul class="clientpanelinfo__list__a">
                <li :value="singleClient?.last_name">Nom du client : {{ singleClient?.last_name ?? "" }} {{ singleClient?.first_name ?? "" }}</li>
                <li :value="singleClient?.phone">Téléphone : {{ singleClient?.phone ?? "" }}</li>
                <li :value="singleClient?.email">Email : {{ singleClient?.email ?? "" }}</li>
            </ul>
            <ul class="clientpanelinfo__list__b">
                <li :value="singleClient?.billing_address + singleClient?.billing_zip_code + singleClient?.billing_city">
                    addresse de facturation : {{ singleClient?.billing_address ?? "" + singleClient?.billing_zip_code ?? ""
                        + ' ' +
                        singleClient?.billing_city ?? "" }}</li>
                <li :value="singleClient?.delivery_address + singleClient?.delivery_zip_code + singleClient?.delivery_city">
                    addresse de livraison : {{ singleClient?.delivery_address ?? "" }} {{ singleClient?.delivery_zip_code ?? "" }}  {{singleClient?.delivery_city ?? "" }}</li>
            </ul>
        </div>

        <div class="clientpanelinfo__footer">
            <div class="clientpanelinfo__footer__buttons">
                <button type="submit" @click="updateClient(singleClient?.id)" class="clientpanelinfo__footer__buttons__edit">Modifier</button>
                <button type="submit" @click="deleteClient(singleClient?.id)" class="clientpanelinfo__footer__buttons__delete">Supprimer</button>
            </div>
        </div>

    </div>
</template>

<script>
import { useClientsStore } from "@/stores/clientsStore";
import { useUtilsStore } from "@/stores/utilsStore";
export default {
    name: "ClientPanelInfoCpt",
    data() {
        return {
            infos: "",
            clientStore: useClientsStore(),
            utilsStore: useUtilsStore()
        }
    },
    created(){},
    computed: {
        singleClient() {
            return this.clientStore.getSingleClient;
        },
        errors() {
            return this.utilsStore.getErrors;
        },
        succes() {
            return this.utilsStore.getSucces;
        }
    },
    methods: {
        updateClient(id) {
            console.log(id)
            this.utilsStore.setFormName("EditClientForm");
            this.clientStore.updateClientInStore(id);
        },
        deleteClient(id){
            this.clientStore.deleteClientAction(id);
        }
    }
};
</script>

<style scoped></style>