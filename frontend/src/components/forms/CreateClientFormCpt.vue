<template>
    <form @submit.prevent="onSubmitForm" class="blockcreateclient__form">

        <!-- <div class="form__field">
            <label for="clientNames">Nom et Prénom</label>
            <input id="clientNames" class="form__field__input" placeholder="" autocomplete @change="onChangeFields"
                type="text" :value="`${fieldsValues.lastName} ${fieldsValues.firstName}`">
        </div> -->

        <div class="createclientform__field__names form__field__flex">
            <div class="form__field">
                <p v-show="errors.clientFirstName">{{ errors.clientFirstName }}</p>
                <label for="clientFirstName">Prénom</label>
                <input id="clientFirstName" class="form__field__input" placeholder="" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientFirstName">
            </div>

            <div class="form__field">
                <p v-show="errors.clientLastName">{{ errors.clientLastName }}</p>
                <label for="clientLastName">Nom</label>
                <input id="clientLastName" class="form__field__input" placeholder="" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientLastName">
            </div>
        </div>

        <div class="createclientform__field__phone__email form__field__flex">
            <div class="form__field">
                <p v-show="errors.clientPhoneNumber">{{ errors.clientPhoneNumber }}</p>
                <label for="clientPhoneNumber">Téléphone</label>
                <input id="clientPhoneNumber" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientPhoneNumber">
            </div>

            <div class="form__field">
                <p v-show="errors.clientEmail">{{ errors.clientEmail }}</p>
                <label for="clientEmail">Adresse email</label>
                <input id="clientEmail" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientEmail">
            </div>
        </div>

        <div class="form__field__billing__adress">
            <div class="form__field">
                <p v-show="errors.clientBillingAdress">{{ errors.clientBillingAdress }}</p>
                <label for="clientBillingAdress">Adresse de facturation</label>
                <input id="clientBillingAdress" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientBillingAdress">
            </div>

            <div class="form__field__billing_zipcode__city form__field__flex">
                <div class="form__field">
                    <p v-show="errors.clientBillingZipCode">{{ errors.clientBillingZipCode }}</p>
                    <label for="clientBillingZipCode">Code postal</label>
                    <input id="clientBillingZipCode" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientBillingZipCode">
                </div>

                <div class="form__field">
                    <p v-show="errors.clientBillingCity">{{ errors.clientBillingCity }}</p>
                    <label for="clientBillingCity">Ville</label>
                    <input id="clientBillingCity" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientBillingCity">
                </div>
            </div>
        </div>


        <div class="form__field__delivery__adress">
            <div class="form__field">
                <p v-show="errors.clientDeliveryAdress">{{ errors.clientDeliveryAdress }}</p>
                <label for="clientDeliveryAdress">Adresse de livraison</label>
                <input id="clientDeliveryAdress" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientDeliveryAdress">
            </div>

            <div class="form__field__delivery__zipcode__city form__field__flex">
                <div class="form__field">
                    <p v-show="errors.clientDeliveryZipCode">{{ errors.clientDeliveryZipCode }}</p>
                    <label for="clientDeliveryZipCode">Code postal</label>
                    <input id="clientDeliveryZipCode" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientDeliveryZipCode">
                </div>

                <div class="form__field">
                    <p v-show="errors.clientDeliveryCity">{{ errors.clientDeliveryCity }}</p>
                    <label for="clientDeliveryCity">Ville</label>
                    <input id="clientDeliveryCity" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" :value="fieldsValues.clientDeliveryCity">
                </div>
            </div>
        </div>

        <div class="form__field">
            <button class="form__field__submit" type="submit">Créer</button>
        </div>

    </form>
</template>

<script>
import { useClientsStore } from "@/stores/clientsStore.js";
import { useUtilsStore } from "@/stores/utilsStore.js";
import sanitizeHtml from 'sanitize-html';

export default {
    name: "CreateClientFormCpt",
    mounted() {
        const clientStore = useClientsStore();
        clientStore.resetform();
    },
    data() {
        return {

        }
    },
    methods: {
        onChangeFields(event) {
            console.log(event.target.value, event.target.id);
            const clientStore = useClientsStore();
            const cleanInputValue = sanitizeHtml(event.target.value, {
                allowedTags: []
            });
            clientStore.setNewClient(cleanInputValue, event.target.id);
        },

        // DONE : Mettre en place un faux submit
        // DONE : Gérer les erreurs au submit, manque des infos dans les champs
        // DONE : Sécurité
        // TODO : Test des méthodes pour remplir le store

        onSubmitForm() {
            console.log("submit form")
            const clientStore = useClientsStore();
            const utilsStore = useUtilsStore();
            utilsStore.setErrorsForm(clientStore.createClientForm);
            clientStore.submitNewClient();
        },
    },
    computed: {
        fieldsValues() {
            const clientStore = useClientsStore();
            return clientStore.getCreateClientForm;
        },
        errors() {
            const utilsStore = useUtilsStore();
            return utilsStore.getErrors;
        },
    }
};
</script>

<style>
.blockcreateclient__form {
    min-width: 20em;
    max-width: 40em;
    width: 50%;
    margin: auto;
}

.form__field__flex {
    display: flex;
    align-items: center;
    gap: 1.5em;
}

.blockcreateclient__form label {
    margin-bottom: .3em;
    text-align: left;
}

.blockcreateclient__form input {
    padding: .2em .5em;
}

.form__button__submit button {
    margin: 0 auto;
}

.form__field__billing__adress,
.form__field__delivery__adress {
    margin-top: 2em;
}

.form__field__billing__adress div,
.form__field__delivery__adress div {
    margin: .5rem 0;
}
</style>