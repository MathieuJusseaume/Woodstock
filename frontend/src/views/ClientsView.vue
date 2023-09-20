<template>
    <div>
        <h1>Ici c'est la page des clients {{ infos }}</h1>
    </div>
</template>

<script>
export default {
    name: "ClientsView",
    data() {
        return {
            infos: "pour le moment 0 clients"
        }
    },
};
</script>

<style scoped></style>