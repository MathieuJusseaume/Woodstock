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
        async updateUserAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
                const token = localStorage.getItem("woodstockJwt");
                const decodedToken = token;
                const response = await Axios.put(`/user/${decodedToken.userId}`, { "Authorization": `Bearer ${token}` });
                
                this.setUpdateUserFormField(response.data.user.email, "userEmail");
                this.setUpdateUserFormField(response.data.user.last_name, "userLastName");
                this.setUpdateUserFormField(response.data.user.first_name, "userFirstName");
                this.setUpdateUserFormField(response.data.user.phone, "userPhoneNumber");

                console.log(`updateUserAction -> ${JSON.stringify(response, null, 2)}`);

            } catch (error) {
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