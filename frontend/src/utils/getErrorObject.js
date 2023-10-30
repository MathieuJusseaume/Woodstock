
export const getErrorsObject = (formValues, formFields, regExp) => {
    // eslint-disable-next-line no-unused-vars
    const regex = regExp;
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

