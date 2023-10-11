import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";

export const useConnectedUserStore = defineStore("connectedUser", {
    state: () => ({
        updateUserForm: {
            userLastName: "",
            userFirstName: "",
            userEmail: "",
            userPhoneNumber: "",
        },
    }),
    getters: {
        getUpdateUserForm: (state) => {
            return state.updateUserForm;
        },
    },
    actions: {
        async getUserByIdAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();

                const token = localStorage.getItem("woodStockPlainTextToken");
                const userId = localStorage.getItem("connectedUserId");
                const response = await Axios.get(`/api/users/${userId}`, { headers : { "Authorization": `Bearer ${token}` } });
                console.log(`getUserByIdAction -> ${JSON.stringify(response, null, 2)}`);
                const connectedUser = response.data[0];
                this.updateUserForm = {
                    userLastName: connectedUser.last_name,
                    userFirstName: connectedUser.first_name,
                    userEmail: connectedUser.email,
                    userPhoneNumber: connectedUser.phone,
                };
            } catch (error) {
                if(error.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }

        },
        async updateUserAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                const token = localStorage.getItem("woodStockPlainTextToken");
                const userId = localStorage.getItem("connectedUserId");
                const body = {
                    "id": userId,
                    "last_name": this.updateUserForm.userLastName,
                    "first_name": this.updateUserForm.userFirstName,
                    "email": this.updateUserForm.userEmail,
                    "phone": this.updateUserForm.userPhoneNumber,
                }
                const response = await Axios.put(`/api/users/${userId}`, body, { headers : { "Authorization": `Bearer ${token}` } });
                console.log(response);
                const connectedUser = response.data[0];
                this.updateUserForm = {
                    userLastName: connectedUser.last_name,
                    userFirstName: connectedUser.first_name,
                    userEmail: connectedUser.email,
                    userPhoneNumber: connectedUser.phone,
                };

                console.log(`updateUserAction -> ${JSON.stringify(response, null, 2)}`);

            } catch (error) {
                if(error.status === 401) {
                    utilsStore.redirectToLogin();
                }
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        setUpdateUserFormField(value, field) {
            this.updateUserForm[field] = value;
        },
        resetform() {
            this.updateUserForm = {
                userLastName: "",
                userFirstName: "",
                userEmail: "",
                userPhoneNumber: "",
            }
        },
    }
});