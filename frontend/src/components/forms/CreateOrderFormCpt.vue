<template>
    <div class="blockcreateorderform">

        <form @submit.prevent="onSubmitForm" class="blockcreateorderform__form">

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="order_number">Numéro de commande*</label>
                <input id="order_number" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.order_number">
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="client_id">Associer un client*</label>
                <select id="client_id" class="form__field__input" @change="onChangeField" v-model="fieldsValues.client_id">
                    <option :value="client.id" v-for="client in clients" :key="client.id">{{ client.last_name }} - {{ client.first_name }}</option>
                </select>
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="order_date">Date de la commande*</label>
                <input id="order_date" class="form__field__input" autocomplete @change="onChangeField" type="date" v-model="fieldsValues.order_date">
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="delivery_date">Date de la livraison*</label>
                <input id="delivery_date" class="form__field__input" autocomplete @change="onChangeField" type="date" v-model="fieldsValues.delivery_date">
            </div>

                
            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="quantity">Nombre de stère*</label>
                <input id="quantity" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.quantity">
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="log_size">Taille des bûches*</label>
                <input id="log_size" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.log_size">
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="delivery_price">Coût de la commande*</label>
                <input id="delivery_price" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.delivery_price">
            </div>

            <div class="form__field">
                <p class="form__field__error"></p>
                <label for="orderPrice">Coût de la livraison*</label>
                <input id="orderPrice" class="form__field__input" autocomplete @change="onChangeField" type="text" v-model="fieldsValues.orderPrice">
            </div>

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
        const clientsStore = useClientsStore();
        clientsStore.getClientsAction();
        const odersStore = useOrdersStore();
        odersStore.resetOrderForm();
    },
    data() {
        return {

        }
    },
    methods: {
        onChangeField(event) {
            console.log(event.target.value, event.target.id);
            const ordersStore = useOrdersStore();
            const cleanInputValue = sanitizeHtml(event.target.value, {
                allowedTags: []
            });
            ordersStore.setCreateOrderFormField(cleanInputValue, event.target.id);
        },
        onSubmitForm() {
            console.log("submit form")
            const ordersStore = useOrdersStore();
            const utilsStore = useUtilsStore();
            //utilsStore.setErrorsForm(clientStore.getCreateOrderForm, allCreateOrderFields);
            ordersStore.createOrderAction();
        },
    },
    computed: {
        fieldsValues() {
            const ordersStore = useOrdersStore();
            return ordersStore.getCreateOrderForm;
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