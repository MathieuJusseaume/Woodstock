<template>
    <div class="blockaccountform">

        <form @submit.prevent="updateUserSubmit" class="blockaccountform__form">

            <div class="form__field">
                    <label for="userLastName">Nom*</label>
                    <input id="userLastName" class="form__field__input" autocomplete @change="onChangeField" type="text" :value="fieldsValues.userLastName">
                </div>

                <div class="form__field">
                    <label for="userFirstName">Prénom*</label>
                    <input id="userFirstName" class="form__field__input" autocomplete @change="onChangeField" type="text" :value="fieldsValues.userFirstName">
                </div>

                <div class="form__field">
                    <label for="userEmail">Email*</label>
                    <input id="userEmail" class="form__field__input" autocomplete @change="onChangeField" type="text" :value="fieldsValues.userEmail">
                </div>

                
                <div class="form__field">
                    <label for="userPhoneNumber">Téléphone*</label>
                    <input id="userPhoneNumber" class="form__field__input" autocomplete @change="onChangeField" type="text" :value="fieldsValues.userPhoneNumber">
                </div>

                <div class="form__field">
                    <button class="form__field__submit" type="submit">Modifier le compte</button>
                </div>

        </form>
    </div>
</template>

<script>
import { useConnectedUserStore } from "@/stores/connectedUserStore.js";
export default {
    name: "AccountFormCpt",
    data() {
        return {

        }
    },
    computed: {
        fieldsValues() {
            const connectedUserStore = useConnectedUserStore();
            return connectedUserStore.getUpdateUserForm;
        },
    },
    methods: {
        onChangeField(event){
            const connectedUserStore = useConnectedUserStore();
            return connectedUserStore.setUpdateUserFormField(event.target.value, event.target.id);
        },
        updateUserSubmit() {
            const connectedUserStore = useConnectedUserStore();
            connectedUserStore.updateUserAction();
        }
    }
    
};
</script>

<style>
.blockaccountform {
    margin: 3rem;
}
.errorMessage {
    color: red;
}
.blockaccountform__form {
    min-width: 250px;
    max-width: 400px; 
    width: 50%;
    margin: auto; 
}
label {
    text-align: left;
}
.form__field {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: .8rem 0;
}
.form__field__input {
    width: 100%;
    height: 1.6rem;
    border: none;
    background-color: rgb(241, 241, 241);
    border-radius: .2rem;
}
.form__field__submit {
    cursor: pointer;
    margin: .5rem 0;
    border: solid 2px #bd9855;
    border-radius: .3rem;
    padding: .3rem .8rem;
    font-size: 1rem;
    font-family: 'Clowey', sans-serif;
    font-weight: 600;
    height: 42px;
    margin-left: 1rem;
    background-color: #bd9855;
    color: #fff;
    width: fit-content;
    min-width: 150px;
    align-self: center;
    transition: .2s;
}
.form__field__submit:hover {
    background-color:#fff;
    color: #bd9855;
    border: 2px solid #bd9855;
}
</style>