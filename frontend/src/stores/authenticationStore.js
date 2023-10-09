import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        email: "",
        password: "",
    }),
    getters: {
        getEmailValue: (state) => {
            return state.email;
        },
        getPasswordValue: (state) => {
            return state.password;
        },
        getToken: () => {
            return Cookies.get("woodStockAuthToken");
        }
    },
    actions: {
        setEmailValue(email) {
            this.email = email;
        },
        setPasswordValue(password) {
            this.password = password;
        },
        async loginAction() {
            const utilsStore = useUtilsStore();
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        logoutAction() {

        },
        async isLoggedAction() {

        },

    }
});