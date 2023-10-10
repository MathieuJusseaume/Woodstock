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
        logoutAction() {
            localStorage.removeItem("woodstockJwt");
        },
        async loginAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 500));
                const response = await axios.post(`http://192.168.1.15:8080/api/login`, { email: this.email, password: this.password });
                
                console.log(`loginAction -> ${JSON.stringify(response, null, 2)}`);

                this.setEmailValue("");
                this.setPasswordValue("");
                localStorage.setItem("woodstockJwt", response.data.token);
                //localStorage.setItem("woodstockSessionToken", response.data.sessionToken);

            } catch (error) {
                console.log(`loginAction -> ${error}`);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        async getUserByIdAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 500));
                const connectedUserStore = useConnectedUserStore();
                const token = localStorage.getItem("woodstockJwt");
                const decodedToken = token;
                const response = await axios.get(`http://192.168.1.15:8080/api/user/${decodedToken.userId}`, { "Authorization": `Bearer ${token}` });
                
                connectedUserStore.setUpdateUserFormField(response.data.user.email, "userEmail");
                connectedUserStore.setUpdateUserFormField(response.data.user.last_name, "userLastName");
                connectedUserStore.setUpdateUserFormField(response.data.user.first_name, "userFirstName");
                connectedUserStore.setUpdateUserFormField(response.data.user.phone, "userPhoneNumber");

                console.log(`getUserByIdAction -> ${JSON.stringify(response, null, 2)}`);  

            } catch (error) {
                console.log(`getUserByIdAction -> ${error}`);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }

        },
    }
});