<template>
    <form @submit.prevent="onSubmitForm" class="blockcreateclient__form">
        <p v-show="succes">{{ succes }}</p>
        <p v-show="errors.errorMessage">{{ errors.errorMessage }}</p>

        <div class="createclientform__field__names form__field__flex">
            <div class="form__field">
                <p v-show="errors.first_name">{{ errors.first_name }}</p>
                <label for="first_name">Prénom</label>
                <input id="first_name" class="form__field__input" placeholder="" autocomplete
                    @change.prevent="onChangeFields" type="text" v-model="fieldsValues.first_name">
            </div>

            <div class="form__field">
                <p v-show="errors.last_name">{{ errors.last_name }}</p>
                <label for="last_name">Nom</label>
                <input id="last_name" class="form__field__input" placeholder="" autocomplete
                    @change.prevent="onChangeFields" type="text" v-model="fieldsValues.last_name">
            </div>
        </div>

        <div class="createclientform__field__phone__email form__field__flex">
            <div class="form__field">
                <p v-show="errors.phone">{{ errors.phone }}</p>
                <label for="phone">Téléphone</label>
                <input id="phone" placeholder="" class="form__field__input" autocomplete @change.prevent="onChangeFields"
                    type="text" v-model="fieldsValues.phone">
            </div>

            <div class="form__field">
                <p v-show="errors.email">{{ errors.email }}</p>
                <label for="email">addresse email</label>
                <input id="email" placeholder="" class="form__field__input" autocomplete @change.prevent="onChangeFields"
                    type="text" v-model="fieldsValues.email">
            </div>
        </div>

        <div class="form__field__billing__address">
            <div class="form__field">
                <p v-show="errors.billing_address">{{ errors.billing_address }}</p>
                <label for="billing_address">addresse de facturation</label>
                <input id="billing_address" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" v-model="fieldsValues.billing_address">
            </div>

            <div class="form__field__billing_zipcode__city form__field__flex">
                <div class="form__field">
                    <p v-show="errors.billing_zip_code">{{ errors.billing_zip_code }}</p>
                    <label for="billing_zip_code">Code postal</label>
                    <input id="billing_zip_code" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" v-model="fieldsValues.billing_zip_code">
                </div>

                <div class="form__field">
                    <p v-show="errors.billing_city">{{ errors.billing_city }}</p>
                    <label for="billing_city">Ville</label>
                    <input id="billing_city" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" v-model="fieldsValues.billing_city">
                </div>
            </div>
        </div>


        <div class="form__field__delivery__address">
            <div class="form__field">
                <p v-show="errors.delivery_address">{{ errors.delivery_address }}</p>
                <label for="delivery_address">addresse de livraison</label>
                <input id="delivery_address" placeholder="" class="form__field__input" autocomplete
                    @change.prevent="onChangeFields" type="text" v-model="fieldsValues.delivery_address">
            </div>

            <div class="form__field__delivery__zipcode__city form__field__flex">
                <div class="form__field">
                    <p v-show="errors.delivery_zip_code">{{ errors.delivery_zip_code }}</p>
                    <label for="delivery_zip_code">Code postal</label>
                    <input id="delivery_zip_code" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" v-model="fieldsValues.delivery_zip_code">
                </div>

                <div class="form__field">
                    <p v-show="errors.delivery_city">{{ errors.delivery_city }}</p>
                    <label for="delivery_city">Ville</label>
                    <input id="delivery_city" placeholder="" class="form__field__input" autocomplete
                        @change.prevent="onChangeFields" type="text" v-model="fieldsValues.delivery_city">
                </div>
            </div>
        </div>

        <div class="form__field">
            <button class="form__field__submit" type="submit">Enregistrer</button>
        </div>

    </form>
</template>

<script>
import { useClientsStore } from "@/stores/clientsStore.js";
import { useUtilsStore } from "@/stores/utilsStore.js";
import sanitizeHtml from 'sanitize-html';
import { allCreateClientFields } from '@/utils/formFields.js';

export default {
    name: "ClientFormCpt",
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

        onSubmitForm() {
            console.log("submit form")
            const clientStore = useClientsStore();
            const utilsStore = useUtilsStore();
            utilsStore.resetErrors();
            utilsStore.setErrorsForm(clientStore.clientForm, allCreateClientFields);
            console.log(utilsStore.getErrors);
            if (Object.keys(utilsStore.getErrors).length === 0) {
                if (utilsStore.getFormName === "EditClientForm") {
                    clientStore.submitUpdateClient();
                } else {
                    clientStore.submitNewClient();
                }
            }

        },
    },
    computed: {
        fieldsValues() {
            const clientStore = useClientsStore();
            return clientStore.getclientForm;
        },
        errors() {
            const utilsStore = useUtilsStore();
            return utilsStore.getErrors;
        },
        succes() {
            const utilsStore = useUtilsStore();
            return utilsStore.getSucces;
        }
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

.form__field__billing__address,
.form__field__delivery__address {
    margin-top: 2em;
}

.form__field__billing__address div,
.form__field__delivery__address div {
    margin: .5rem 0;
}
</style>