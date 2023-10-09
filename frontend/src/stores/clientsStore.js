import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";

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
		async submitNewClient() {
			try {
				await new Promise(resolve => setTimeout(resolve, 1000));

				// if(status === 200){
				// reset form si tout est ok
				// resetform(createClientForm)
				// }

			} catch (error) {
				throw new Error(error.message);
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