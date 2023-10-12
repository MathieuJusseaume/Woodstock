<template>
    <div>
        <h1>Ici c'est la page des commandes {{ infos }}</h1>
    </div>
</template>

<script>

export default {
    name: "OrdersView",
    data() {
        return {
            infos: "pour le moment 0 commandes"
        }
    },
};
</script>
