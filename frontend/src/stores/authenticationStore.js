import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";
import Cookies from 'js-cookie';

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
            return Cookies.get('woodStockAuthToken');
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
            console.log(utilsStore);
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
                const jwtToken = "ghfdhslerdgyrudjklflsdlhsgldhitvhnglj";
                Cookies.set('woodStockAuthToken', jwtToken, { secure: true, httpOnly: true });
            } catch (error) {
                console.log(error);
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        logoutAction() {
            Cookies.remove('woodStockAuthToken');     
        }

    }
});