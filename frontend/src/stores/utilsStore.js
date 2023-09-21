import { defineStore } from "pinia";

export const useUtilsStore = defineStore("utils", {
    state: () => ({
        formName: "",

    }),
    getters: {
        getFormName: (state) => {
            return state.formName;
        },

    },
    actions: {
        setFormName(formNameValue) {
            console.log(formNameValue);
            this.formName = formNameValue;
        },
    }
});