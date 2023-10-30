import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";
import router from "@/router";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        email: "beier.harmon@example.org",
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
            localStorage.removeItem("user");
        },
        async loginAction() {
            localStorage.removeItem("user");

            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue()
                await Axios.get(`sanctum/csrf-cookie`);
                const response = await Axios.post(`/api/login`, { email: this.email, password: this.password });
                // console.log(`loginAction -> ${JSON.stringify(response, null, 2)}`);
                if (response.data) {
                    this.setEmailValue("");
                    this.setPasswordValue("");
                    localStorage.setItem("user", response.data.user);
                    router.push("/commandes");
                } else {
                    throw new Error('Empty response');
                }
            } catch (error) {
                this.errorMessage = "Identifiants invalides";
                console.log(`loginAction -> ${error}`);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        // TODO not implemented on back end side
        async refreshConnexionAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
                //const sessionToken = localStorage.getItem("woodstockSessionToken");
                /* if(sessionToken) {
                    console.log("coucou");
                    // todo call http here
                    localStorage.setItem("woodStockPlainTextToken", response.data.jwtToken);
                    localStorage.setItem("woodstockSessionToken", response.data.sessionToken);
                } else {
                    throw new Error("No session token");
                } */

            } catch (error) {
                localStorage.removeItem("user");
                console.log(`refreshConnexionAction -> ${error}`);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
    }
});