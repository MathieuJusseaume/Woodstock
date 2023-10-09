import { defineStore } from "pinia";
import { missingValuesInForm } from "@/utils/inputForm.js";

export const useUtilsStore = defineStore("utils", {
	state: () => ({
		formName: "",
		isLoading: false,
		errors: {
			clientFirstName: ""
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
		setErrorsForm(completeForm) {

			this.errors = { ...missingValuesInForm(completeForm) };
		}
	}
});