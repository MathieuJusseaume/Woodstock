import { defineStore } from "pinia";
import { getErrorsObject } from "@/utils/getErrorObject.js";
import { regex } from '@/utils/formFields.js';

export const useUtilsStore = defineStore("utils", {
    state: () => ({
        formName: "",
        isLoading: false,
        errors: {
        }
    }),
    getters: {
        getFormName: (state) => {
            return state.formName;
        },
        getIsLoading: (state) => {
            return state.isLoading;
        },
        getErrors: (state) => {
            return state.errors;
        },
    },
    actions: {
        setFormName(formNameValue) {
            this.formName = formNameValue;
        },
        toggleIsLoadingValue() {
            this.isLoading = !this.isLoading;
        },
        setErrorsForm(completeForm, fieldsOfForm) {
            this.errors = { ...getErrorsObject(completeForm, fieldsOfForm, regex) };
        }
    }
});