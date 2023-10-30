<template>
    <div>
        <h1>Ici c'est la page d'un client : {{ infos }}</h1>
    </div>
</template>

<script>

export default {
    name: "SingleClientView",
    data() {
        return {
            infos: "pour le moment pas de détails sur un client"
        }
    },
};
</script>
