import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useClientsStore = defineStore("clients", {
    state: () => ({
        clients: [],
        clientForm: {
            last_name: "",
            first_name: "",
            email: "",
            phone: "",
            billing_address: "",
            billing_zip_code: "",
            billing_city: "",
            delivery_address: "",
            delivery_zip_code: "",
            delivery_city: "",
            company_id: 1
        },
    }),
    getters: {
        getClients: (state) => {
            return state.clients;
        },
        getclientForm: (state) => {
            return state.clientForm;
        },
        getSingleClientById: (state) => {
            return (clientId) => state.clients.find((client) => client.id === Number(clientId));
        }
    },
    actions: {
        async getClientsAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.get(`/api/clients`);
                console.log(`getClientsAction -> ${JSON.stringify(response, null, 2)}`);
                response.data.forEach(client => {
                    this.clients.push(client);
                });
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        updateClientInStore(id) {
            const clientToUpdate = this.getSingleClientById(id);
            const clientToBeUpdated = { ...clientToUpdate };
            this.clientForm = clientToBeUpdated;
        },
        async submitUpdateClient() {
            const utilsStore = useUtilsStore();
            utilsStore.toggleIsLoadingValue();
            try {
                const response = await Axios.put(`api/clients/${this.clientForm.id}`, this.clientForm, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cache-Control': 'no-cache',
                    }
                });
                if (response.status === 200) {
                    utilsStore.setSuccesMessage("Le client a été mis à jour !");
                    this.clients = this.clients.filter((client) => client.id !== this.clientForm.id);
                    this.clients.push({ ...this.clientForm });
                    this.resetform();
                    utilsStore.resetSuccesMessage();
                }

            } catch (error) {
                utilsStore.setErrorsResponse(error.response.status, error.response.data);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async deleteClientAction(userIdToDelete) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.delete(`/api/clients/${userIdToDelete}`);
                console.log(`deleteClientAction -> ${JSON.stringify(response, null, 2)}`);
                this.clients = this.clients.filter(client => client.id !== parseInt(userIdToDelete, 10));
            } catch (error) {
                if(error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async submitNewClient() {
            const utilsStore = useUtilsStore();
            try {
                const token = localStorage.getItem("woodStockPlainTextToken");
                utilsStore.toggleIsLoadingValue();

                const response = await Axios.post(`api/clients`, this.clientForm, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log("🚀 ~ file: clientsStore.js:102 ~ submitUpdateClient ~ response:", response);
                console.log("🚀 ~ file: clientsStore.js:102 ~ submitUpdateClient ~ response.request:", response.request);
                console.log("🚀 ~ file: clientsStore.js:102 ~ submitUpdateClient ~ response.config:", response.config);
                if (response.status === 201) {
                    utilsStore.setSuccesMessage("Un nouveau client a été créé !");
                    this.resetform();
                    utilsStore.resetSuccesMessage();
                }
            } catch (error) {
                utilsStore.setErrorsResponse(error.response.status, error.response.data);
                throw new Error(error.message);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        getClientById(clientId) {
            console.log(clientId);
        },
        setNewClient(value, field) {
            this.clientForm[field] = value;
        },
        resetform() {
            this.clientForm = {
                last_name: "",
                first_name: "",
                email: "",
                phone: "",
                billing_address: "",
                billing_zip_code: "",
                billing_city: "",
                delivery_address: "",
                delivery_zip_code: "",
                delivery_city: "",
                company_id: 1

            }
        },

    }
});