export const missingValuesInForm = (formValues) => {

    const regex = {
        regexstring: "",
        regexInt: ""
    }

    const allFields = {
        "clientLastName": {
            "regex": regex.regexstring,
            "errorMessage": "Le nom dois faire X caractères"
        }
    };

    const errorsMessages = {};

    formValues.map((formValue, keyName) => {
        console.log(keyName, formValue); // clientLastName,  ""
        if (!formValue.test(allFields[keyName].regex)) {
            errorsMessages[keyName] = allFields[keyName].errorMessage;
        }
    });
    return errorsMessages;
};
