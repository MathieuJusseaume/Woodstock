import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import axios from "axios";
import { useConnectedUserStore } from "./connectedUserStore";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        email: "littel.lexie@example.com",
        password: "password",
    }),
    getters: {
        getEmailValue: (state) => {
            return state.email;
        },
        getPasswordValue: (state) => {
            return state.password;
        },
    },
    actions: {
        toggleIsLogged() {
            this.isLogged = !this.isLogged;
        },
        setEmailValue(email) {
            this.email = email;
        },
        setPasswordValue(password) {
            this.password = password;
        },
        async loginAction() {
            const utilsStore = useUtilsStore();
            const connectedUserStore = useConnectedUserStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await axios.post("http://192.168.1.15:8080/api/login", { email: this.email, password: this.password });
                console.log(response);
                // fill data into connected user store
                if(response.data.user) {
                    connectedUserStore.setUpdateUserFormField(response.data.user.email, "userEmail");
                    connectedUserStore.setUpdateUserFormField(response.data.user.last_name, "userLastName");
                    connectedUserStore.setUpdateUserFormField(response.data.user.first_name, "userFirstName");
                    connectedUserStore.setUpdateUserFormField(response.data.user.phone, "userPhoneNumber");
                    this.setEmailValue("");
                    this.setPasswordValue("");
                    localStorage.setItem("isLogged", true);
                } else {
                    console.log("Error empty response");
                }
            } catch (error) {
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        logoutAction() {
            localStorage.removeItem("isLogged");
        }
    }
});