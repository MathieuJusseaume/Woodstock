import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Axios from "../_services/callerService";
import router from "@/router";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        email: "jvonrueden@example.org",
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
            localStorage.removeItem("connectedUserId");
        },
        async loginAction() {
            localStorage.removeItem("connectedUserId");

            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue()
                await Axios.get(`sanctum/csrf-cookie`);
                const response = await Axios.post(`/api/login`, { email: this.email, password: this.password });
                if (response.data) {
                    this.setEmailValue("");
                    this.setPasswordValue("");
                    localStorage.setItem("connectedUserId", response.data.user.id);
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
    }
});