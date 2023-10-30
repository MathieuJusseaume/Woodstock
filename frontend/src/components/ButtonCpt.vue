<template>
    <div>
        <button type="button">un bouton pour {{ infos }}</button>
    </div>
</template>

<script>
export default {
    name: "ButtonCpt",
    data() {
        return {
            infos: "faire un truc"
        }
    },
};
</script>

<style scoped></style>