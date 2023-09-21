<template>
    <div>
        <h1>Ici c'est le compsant datatable pour {{ infos }}</h1>
    </div>
</template>

<script>
export default {
    name: "ClientsListCpt",
    data() {
        return {
            infos: "le liste des clients"
        }
    },
};
</script>

<style scoped></style>