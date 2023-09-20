<template>
    <div>
        <h1>Ici c'est la page d'une commande : {{ infos }}</h1>
    </div>
</template>

<script>

export default {
    name: "SingleOrderView",
    data() {
        return {
            infos: "pour le moment pas de détails sur une commande"
        }
    },
};
</script>
