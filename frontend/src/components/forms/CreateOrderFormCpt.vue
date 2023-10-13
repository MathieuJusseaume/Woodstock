<template>
    <div class="blockcreateorderform">

        <form @submit.prevent="updateUserSubmit" class="blockcreateorderform__form">

            <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="clientId">Associer un client*</label>
                    <select id="clientId" class="form__field__input" @change="onChangeField" v-model="fieldsValues.clientId">
                        <option :value="client.id" v-for="client in clients" :key="client.id">{{ client.last_name }} - {{ client.first_name }}</option>
                    </select>
                </div>

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="orderDate">Date de la commande*</label>
                    <input id="orderDate" class="form__field__input" autocomplete @change="onChangeField" type="date" v-model="fieldsValues.orderDate">
                </div>

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="orderDeliveryDate">Date de la livraison*</label>
                    <input id="orderDeliveryDate" class="form__field__input" autocomplete @change="onChangeField" type="date" v-model="fieldsValues.orderDeliveryDate">
                </div>

                
                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="quantity">Nombre de stère*</label>
                    <input id="quantity" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.quantity">
                </div>

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="logSize">Taille des bûches*</label>
                    <input id="logSize" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.logSize">
                </div>

<!--                 <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="userId">Assigner un livreur*</label>
                    <select id="userId" class="form__field__input" @change="onChangeField">
                        <option v-for="client in clients" :key="client.id">{{ client.last_name }} - {{ client.first_name }}</option>
                    </select>
                </div> -->

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="deliveryPrice">Coût de la commande*</label>
                    <input id="deliveryPrice" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.orderPrice">
                </div>

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="orderPrice">Coût de la livraison*</label>
                    <input id="orderPrice" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.deliveryPrice">
                </div>

<!--                 <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="userPhoneNumber">Statut de livraison*</label>
                    <input id="userPhoneNumber" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.userPhoneNumber">
                </div>

                <div class="form__field">
                    <p class="form__field__error"></p>
                    <label for="userPhoneNumber">Statut de paiement*</label>
                    <input id="userPhoneNumber" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.userPhoneNumber">
                </div> -->

                <div class="form__field">
                    <button class="form__field__submit" type="submit">Crée la commande</button>
                </div>

        </form>

    </div>
</template>

<script>
import { useClientsStore } from "@/stores/clientsStore.js";
import { useOrdersStore } from "@/stores/ordersStore.js";
import { useUtilsStore } from "@/stores/utilsStore.js";
import sanitizeHtml from 'sanitize-html';
import { allCreateOrderFields } from '@/utils/formFields.js';

export default {
    name: "CreateClientFormCpt",
    mounted() {
        const clientStore = useClientsStore();
        clientStore.resetform();
        clientStore.getClientsAction();
    },
    data() {
        return {

        }
    },
    methods: {
        onChangeFields(event) {
            console.log(event.target.value, event.target.id);
            const ordersStore = useOrdersStore();
            const cleanInputValue = sanitizeHtml(event.target.value, {
                allowedTags: []
            });
            ordersStore.setCreateOrderFormField(cleanInputValue, event.target.id);
        },
        onSubmitForm() {
            console.log("submit form")
            const clientStore = useClientsStore();
            const utilsStore = useUtilsStore();
            utilsStore.setErrorsForm(clientStore.getCreateOrderForm, allCreateOrderFields);
            clientStore.submitNewClient();
        },
    },
    computed: {
        fieldsValues() {
            const ordersStore = useOrdersStore();
            return ordersStore.getCreateOderForm;
        },
        errors() {
            const utilsStore = useUtilsStore();
            return utilsStore.getErrors;
        },
        clients() {
            const clientStore = useClientsStore();
            return clientStore.getClients;
        }
    }
};
</script>

<style>
.blockcreateorderform {
    margin: 3rem;
}
.form__field__error {
    color: red;
    text-align: left;
    font-size: .7rem;
}
.blockcreateorderform__form {
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