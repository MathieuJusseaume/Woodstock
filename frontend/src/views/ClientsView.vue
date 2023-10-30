<template>
    <div>
        <h1>Ici c'est la page des clients {{ infos }}</h1>
        <ClientsListCpt />
    </div>
</template>

<script>
import ClientsListCpt from "@/components/dataTables/ClientsListCpt.vue";

export default {
    name: "ClientsView",
    components: {
        ClientsListCpt
    },
    data() {
        return {
            infos: "pour le moment 0 clients"
        }
    },
};
</script>

<style scoped></style>