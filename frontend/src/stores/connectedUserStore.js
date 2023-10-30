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

                const user = localStorage.getItem("user");
                const response = await Axios.get(`/api/users/${user}`);
                console.log(`getUserByIdAction -> ${JSON.stringify(response, null, 2)}`);
                const connectedUser = response.data[0];
                this.updateUserForm = {
                    userLastName: connectedUser.last_name,
                    userFirstName: connectedUser.first_name,
                    userEmail: connectedUser.email,
                    userPhoneNumber: connectedUser.phone,
                };
            } catch (error) {
                if(error?.response?.status === 401) {
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
                const user = localStorage.getItem("user");
                const body = {
                    "id": user.id,
                    "last_name": this.updateUserForm.userLastName,
                    "first_name": this.updateUserForm.userFirstName,
                    "email": this.updateUserForm.userEmail,
                    "phone": this.updateUserForm.userPhoneNumber,
                }
                const response = await Axios.put(`/api/users/${user}`, body);
                console.log(response);
                const connectedUser = response.data.user;
                this.updateUserForm = {
                    userLastName: connectedUser.last_name,
                    userFirstName: connectedUser.first_name,
                    userEmail: connectedUser.email,
                    userPhoneNumber: connectedUser.phone,
                };

                console.log(`updateUserAction -> ${JSON.stringify(response, null, 2)}`);

            } catch (error) {
                if(error?.response?.status === 401) {
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