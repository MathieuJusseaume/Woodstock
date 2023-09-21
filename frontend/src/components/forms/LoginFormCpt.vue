<template>
    <div class="blocklogin">

        <header class="blocklogin__header">
            <img class="blocklogin__header__logo" alt="logo">
        </header>

        <form @submit.prevent="loginSubmit" class="blocklogin__form">
            <div class="form__field">
                <label for="loginEmail">Email*</label>
                <input id="loginEmail" class="form__field__input" autocomplete @change="onChangeEmail" type="text" :value="email">
            </div>

            <div class="form__field">
                <label for="loginPassword">Password*</label>
                <input id="loginPassword" class="form__field__input" autocomplete @change="onChangePassword" type="password" :value="password">
            </div>

            <!-- IDEE si on voulait découper davantage on pourrai créer un composant input -->
            <!-- <InputCpt id="monId" labelText="mon texte" type="email" @onChangeValue="onChangeEmail" /> -->

            <div class="form__field">
                <button class="form__field__submit" type="submit">Connexion</button>
            </div>

        </form>
    </div>

</template>

<script>
export default {
    name: "LoginFormCpt",
    data() {
        return {
            infos: ""
        }
    },
    methods: {
        onChangeEmail(){
            
        },
        onChangePassword (){}
    }
    
};
</script>
