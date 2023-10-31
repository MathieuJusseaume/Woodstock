<template>
    <div>
        <h1>Ici c'est la page d'un client : {{ infos }}</h1>
        <ClientPanelInfoCpt></ClientPanelInfoCpt>
        <OrdersListCpt></OrdersListCpt>
    </div>
</template>

<script>
import ClientPanelInfoCpt from "@/components/ClientPanelInfoCpt.vue";
import OrdersListCpt from "@/components/dataTables/OrdersListCpt.vue";
import { useClientsStore } from "@/stores/clientsStore.js";

export default {
    name: "SingleClientView",
    components: {
        ClientPanelInfoCpt,
        OrdersListCpt
    },
    data() {
        return {
            infos: "pour le moment pas de détails sur un client",
            clientStore : useClientsStore()
        }
    },
    created(){
      if(this.clientStore.singleClient === null){
        console.log(this.$route.params.id);
        this.clientStore.getClientById(this.$route.params.id);
      }
    },
    mounted() {
        console.log("getClient");
        // const getClient = this.useClientStore.getClientById(1);
        // console.log("🚀 ~ file: SingleClientView.vue:28 ~ getClient ~ getClient:", getClient)
    }
};
</script>
