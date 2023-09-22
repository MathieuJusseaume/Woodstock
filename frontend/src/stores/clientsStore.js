import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";

export const useClientsStore = defineStore("clients", {
    state: () => ({
        clients: [],
        createClientForm: {
            lastName: "",
            firstName: "",
            /* etc. */
        },
        updateClientForm: {
            lastName: "",
            firstName: "",
            /* etc. */
        },
    }),
    getters: {
        getClients: (state) => {
            return state.clients;
        },
        getCreateClientForm: (state) => {
            return state.createClientForm;
        },
        getUpdateClientForm: (state) => {
            return state.updateClientForm;
        },
    },
    actions: {
        async getClientsAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
                const data = [
                    {
                        id: 0,
                        last_name: "ing",
                        first_name: "string",
                        delivery_adress: "string",
                        delivery_zip_code: 0,
                        delivery_city: "string",
                        billing_adress: "string",
                        billing_zip_code: 0,
                        billing_city: "string",
                        email: "string",
                        phone: "string",
                    },
                    {
                        id: 1,
                        last_name: "string",
                        first_name: "string",
                        delivery_adress: "string",
                        delivery_zip_code: 0,
                        delivery_city: "string",
                        billing_adress: "string",
                        billing_zip_code: 0,
                        billing_city: "string",
                        email: "string",
                        phone: "string",
                    },
                    {
                        id: 2,
                        last_name: "string",
                        first_name: "string",
                        delivery_adress: "string",
                        delivery_zip_code: 0,
                        delivery_city: "string",
                        billing_adress: "string",
                        billing_zip_code: 0,
                        billing_city: "string",
                        email: "string",
                        phone: "string",
                    },
                ];
                this.clients = data;
            } catch (error) {
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async updateClientAction() {

        },
        async deleteClientAction() {

        },
        getClientById() {

        },
        //on utilisera cette méthode lors de l'update d'un nouveau clien
        setClientsAfterUpdate() {

        },
    }
});