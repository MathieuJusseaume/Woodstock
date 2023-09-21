import { defineStore } from "pinia";

export const useUtilsStore = defineStore("utils", {
    state: () => ({
        formName: "",
        isLoading: false
    }),
    getters: {
        getFormName: (state) => {
            return state.formName;
        },
        getIsLoading: (state) => {
            return state.isLoading;
        },

    },
    actions: {
        setFormName(formNameValue) {
            this.formName = formNameValue;
        },
        toggleIsLoadingValue() {
            this.isLoading = !this.isLoading;
        }
    }
});