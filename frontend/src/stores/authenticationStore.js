import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";
import { useConnectedUserStore } from "./connectedUserStore";
import VueJwtDecode from "vue-jwt-decode";
import router from "@/router";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        email: "hintz.rhett@example.org",
        password: "password",
        errorMessage: ""
    }),
    getters: {
        getEmailValue: (state) => {
            return state.email;
        },
        getPasswordValue: (state) => {
            return state.password;
        },
        getErrorMessage: (state) => {
            return state.errorMessage;
        }
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

                const resp = await Axios.get(`/sanctum/csrf-cookie`);

                const response = await Axios.post(`/api/login`, { email: this.email, password: this.password });
                console.log(`loginAction -> ${JSON.stringify(response, null, 2)}`);
                if(response.data) {
                    this.setEmailValue("");
                    this.setPasswordValue("");
                    localStorage.setItem("woodstockJwt", response.data.token.plainTextToken);
                    localStorage.setItem("connectedUserId", response.data.token.accessToken.tokenable_id);
                } else {
                    throw new Error('Empty response');
                }
                this.getUserByIdAction();
                router.push("/commandes")
            } catch (error) {
                this.errorMessage = "Identifiants invalides";
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
                const userId = localStorage.getItem("connectedUserId");
                console.log(token);
                console.log(userId);
                const response = await Axios.get(`/api/users/${userId}`, { 
                    headers : { 
                        "Content-Type": "application/json", 
                        "Accept": "application/json", 
                        "Authorization": `Bearer ${token}`
                        }
                    }
                );
                
               /*  connectedUserStore.setUpdateUserFormField(response.data.user.email, "userEmail");
                connectedUserStore.setUpdateUserFormField(response.data.user.last_name, "userLastName");
                connectedUserStore.setUpdateUserFormField(response.data.user.first_name, "userFirstName");
                connectedUserStore.setUpdateUserFormField(response.data.user.phone, "userPhoneNumber"); */

                console.log(`getUserByIdAction -> ${JSON.stringify(response, null, 2)}`);  

            } catch (error) {
                console.log(`getUserByIdAction -> ${error}`);
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }

        },
        // TODO
        async refreshConnexionAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue(); 
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                //const sessionToken = localStorage.getItem("woodstockSessionToken");
                /* if(sessionToken) {
                    console.log("coucou");
                    // todo call http here
                    localStorage.setItem("woodstockJwt", response.data.jwtToken);
                    localStorage.setItem("woodstockSessionToken", response.data.sessionToken);
                } else {
                    throw new Error("No session token");
                } */

            } catch (error) {
                localStorage.removeItem("woodstockJwt");
                localStorage.removeItem("woodstockSessionToken");
                console.log(`refreshConnexionAction -> ${error}`);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
    }
});