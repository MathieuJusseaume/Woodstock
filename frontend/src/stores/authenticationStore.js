import { defineStore } from "pinia";
import { useUtilsStore } from "./utilsStore";

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
            // chercher le token en cookie httponly
        }
    },
    actions: {
        setEmailValue: (email) => {
            this.email = email;
        },
        setPasswordValue: (password) => {
            this.password = password;
        },
        async loginAction() {
            const utilsStore = useUtilsStore();
            console.log(utilsStore);
            try {
                utilsStore.toggleIsLoadingValue();
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                
            } finally {
                utilsStore.toggleIsLoadingValue();
            }
        },
        logoutAction() {
            
        }
        
    }
});