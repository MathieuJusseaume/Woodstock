import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import axios from "axios";

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
                const response = await axios.post("http://192.168.1.15:8080/api/login", { email: this.email, password: this.password });
                console.log(response);
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