import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import { useOrdersStore } from "./ordersStore";
import Axios from "../_services/callerService";
import router from "@/router";

export const useClientsStore = defineStore("clients", {
    state: () => ({
        clients: [],
        singleClient: null,
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
            company_id: 1,
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
        },
        getSingleClient(state) {
            return state.singleClient;
        }
    },
    actions: {
        async getClientsAction() {
            const utilsStore = useUtilsStore();
            try {
                this.clients = [];
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.get(`/api/clients`);
                // console.log(`getClientsAction -> ${JSON.stringify(response, null, 2)}`);
                response.data.client.forEach(client => {
                    this.clients.push(client);
                });
            } catch (error) {
                if (error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        updateClientInStore(id) {
            let clientToBeUpdated;
            if (this.clients.length > 0) {
                const clientToUpdate = this.getSingleClientById(id);
                clientToBeUpdated = { ...clientToUpdate };
            } else if (this.singleClient) {
                clientToBeUpdated = this.singleClient
            }

            this.clientForm = clientToBeUpdated;
        },
        async submitUpdateClient() {
            const utilsStore = useUtilsStore();
            utilsStore.toggleIsLoadingValue();
            try {
                const response = await Axios.put(`api/clients/${this.clientForm.id}`, this.clientForm);
                if (response.status === 200) {
                    utilsStore.setSuccesMessage("Le client a été mis à jour !");
                    this.clients = this.clients.filter((client) => client.id !== this.clientForm.id);
                    this.clients.push({ ...this.clientForm });
                    this.resetform();
                    utilsStore.resetSuccesMessage();
                }

            } catch (error) {
                utilsStore.setErrorsResponse(error.response.status, error.response.data);
                if (error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async deleteClientAction(userIdToDelete) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await Axios.delete(`/api/clients/${userIdToDelete}`);
                this.clients = this.clients.filter(client => client.id !== parseInt(userIdToDelete, 10));
            } catch (error) {
                if (error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
                router.push('/clients')
            }
        },
        async submitNewClient() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.post(`api/clients`, this.clientForm);
                if (response.status === 201) {
                    utilsStore.setSuccesMessage("Un nouveau client a été créé !");
                    this.resetform();
                    utilsStore.resetSuccesMessage();
                }
            } catch (error) {
                utilsStore.setErrorsResponse(error.response.status, error.response.data);
                if (error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async getClientById(clientId) {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const response = await Axios.get(`/api/clients/${clientId}`);
                if (response.status === 200) {
                    // console.log("🚀 ~ file: clientsStore.js:137 ~ getClientById ~ response:", response.data.client)
                    this.singleClient = response?.data?.client;
                    useOrdersStore().setOrders(response.data?.client?.orders ?? []);
                }
            } catch (error) {
                utilsStore.setErrorsResponse(error.response.status, error.response.data);
                if (error?.response?.status === 401) {
                    utilsStore.redirectToLogin();
                }
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
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