import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useClientsStore = defineStore("clients", {
    state: () => ({
        clients: [],
        createClientForm: {
            clientLastName: "",
            clientFirstName: "",
            clientEmail: "",
            clientPhoneNumber: "",
            clientBillingAdress: "",
            clientBillingZipCode: "",
            clientBillingCity: "",
            clientDeliveryAdress: "",
            clientDeliveryZipCode: "",
            clientDeliveryCity: ""
        },
        updateClientForm: {
            clientLastName: "",
            clientFirstName: "",
            clientEmail: "",
            clientPhoneNumber: "",
            clientBillingAdress: "",
            clientBillingZipCode: "",
            clientBillingCity: "",
            clientDeliveryAdress: "",
            clientDeliveryZipCode: "",
            clientDeliveryCity: ""

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
                const token = localStorage.getItem("woodStockPlainTextToken");
                const response = await Axios.get(`/api/clients`, { headers : { "Authorization": `Bearer ${token}` } });
                console.log(`getClientsAction -> ${JSON.stringify(response, null, 2)}`);
                response.data.forEach(client => {
                    this.clients.push(client);
                });   
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
        async submitNewClient() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();

                await new Promise(resolve => setTimeout(resolve, 1000));

                // if(status === 200){
                // reset form si tout est ok
                // resetform(createClientForm)
                // }

            } catch (error) {
                throw new Error(error.message);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        getClientById(clientId) {
            console.log(clientId);
        },
        //on utilisera cette méthode lors de l'update d'un nouveau client
        setClientsAfterUpdate() {
        },
        setNewClient(value, field) {
            this.createClientForm[field] = value;
        },
        resetform(formToReset) {
            this[formToReset] = {
                clientLastName: "",
                clientFirstName: "",
                clientEmail: "",
                clientPhoneNumber: "",
                clientBillingAdressInfos: {
                    clientBilingAdress: "",
                    clientBillingZipCode: "",
                    clientBillingCity: ""
                },
                clientDeliveryAdressInfos: {
                    clientDeliveryAdress: "",
                    clientDeliveryZipCode: "",
                    clientDeliveryCity: ""
                }
            }
        },

    }
});