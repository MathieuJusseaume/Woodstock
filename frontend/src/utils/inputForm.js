export const missingValuesInForm = (formValues, formFields) => {
    // eslint-disable-next-line no-unused-vars
    const regex = {
        regexString: /^[a-zA-Z]+$/,
        regexInt: /[0-9]/,
        regexEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        regexStringInt: /[a-bA-Z][0-9]/,
    }

    const allFields = formFields;

    const errorsMessages = {};

    for (const keyName in formValues) {

        if (!allFields[keyName].regex.test(formValues[keyName])) {
            errorsMessages[keyName] = allFields[keyName].errorMessage;
        }

        if (formValues[keyName] === "") {
            errorsMessages[keyName] = "Le champ est vide";
        }
    }
    return errorsMessages;
};

