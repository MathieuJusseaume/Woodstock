export const missingValuesInForm = (formValues) => {
    console.log("🚀 ~ file: inputForm.js:2 ~ missingValuesInForm ~ formValues:", formValues)
    const regex = {
        regexString: /[a-b][A-Z]/,
        regexInt: /[0-9]/,
        regexEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    }

    const allFields = {
        "clientLastName": {
            "regex": regex.regexString,
            "errorMessage": "Le nom ne doit pas contenir de nombre"
        },
        "clientFirstName": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientEmail": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientPhoneNumber": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientBillingAdress": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientBillingZipCode": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientBillingCity": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientDeliveryAdress": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientDeliveryZipCode": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },
        "clientDeliveryCity": {
            "regex": regex.regexString,
            "errorMessage": "Le prénom ne doit pas contenir de nombre"
        },

    };

    const errorsMessages = {};


    for (const keyName in formValues) {
        console.log("keyName :" + keyName, "formValue :" + formValues[keyName]);
        console.log(allFields[keyName].regex);

        if (formValues[keyName] === "") {
            errorsMessages[keyName] = "Le champ est vide";
        }

        // if (!formValues[keyName].match(allFields[keyName].regex)) {
        //     errorsMessages[keyName] = allFields[keyName].errorMessage;
        // }

    }
    return errorsMessages;
};

// Architecture multi couche interface + api + bdd
// Vérif injection sql xss token csrf