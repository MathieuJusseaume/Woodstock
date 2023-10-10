import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";
import { useConnectedUserStore } from "./connectedUserStore";
import VueJwtDecode from "vue-jwt-decode";

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
                const response = await Axios.post(`/login`, { email: this.email, password: this.password });
                
                console.log(`loginAction -> ${JSON.stringify(response, null, 2)}`);

                this.setEmailValue("");
                this.setPasswordValue("");
                localStorage.setItem("woodstockJwt", response.data.token);
                //localStorage.setItem("woodstockSessionToken", response.data.sessionToken);
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJ1c2VyaWQiOjF9.fERikhVnvaBsYXk8wmGpgJyug2xBLq3Lx0oKBpnfsew";
                let decoded = VueJwtDecode.decode(token);
                console.log(decoded);

                this.getUserByIdAction();

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
                const response = await Axios.get(`/user/${decodedToken.userId}`, { "Authorization": `Bearer ${token}` });
                
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
        async refreshConnexionAction() {
            // TODO
            
            try {
                const token = localStorage.getItem("woodstockJwt");
                if(token) {

                }       
            } catch (error) {
                
            }
        },
    }
});