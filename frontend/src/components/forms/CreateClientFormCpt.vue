<template>
    <form @submit.prevent="" class="createclientform">

        <form @submit.prevent="" class="blockcreateclient__form">

            <div class="blockcreateclient__form__field">
                <label for="">Nom et Prénom</label>
                <input id="" class="blockcreateclient__form__field" autocomplete @change.prevent="" type="text"
                    :value="">
            </div>

            <div class="blockcreateclient__form__field">
                <label for=""></label>
                <input id="" class="blockcreateclient__form__field" autocomplete @change.prevent="" type="text"
                    :value="">
            </div>

            <div class="createclientform__field">
                <button class="createclientform__field__submit" type="submit">Créer</button>
            </div>

        </form>




    </form>
</template>

<script>
export default {
    name: "CreateClientFormCpt",
    data() {
        return {

        }
    },
    methods: {
    }

};
</script>
