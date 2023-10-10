export const regex = {
    regexString: /^[a-zA-Z]+$/,
    regexInt: /[0-9]/,
    regexEmail: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    regexStringInt: /[a-bA-Z][0-9]/,
}

export const allCreateClientFields = {
    "clientLastName": {
        "regex": regex.regexString,
        "errorMessage": "Le nom ne doit pas contenir de caractères spéciaux"
    },
    "clientFirstName": {
        "regex": regex.regexString,
        "errorMessage": "Le prénom ne doit pas contenir de caractères spéciaux"
    },
    "clientEmail": {
        "regex": regex.regexEmail,
        "errorMessage": "L'email n'est pas conforme"
    },
    "clientPhoneNumber": {
        "regex": regex.regexInt,
        "errorMessage": "Le numéro de téléphone ne doit pas contenir de caractères spéciaux"
    },
    "clientBillingAdress": {
        "regex": regex.regexStringInt,
        "errorMessage": "L'adresse n'est pas conforme"
    },
    "clientBillingZipCode": {
        "regex": regex.regexInt,
        "errorMessage": "Le code postal ne doit pas contenir de caractères spéciaux"
    },
    "clientBillingCity": {
        "regex": regex.regexString,
        "errorMessage": "La ville ne doit pas contenir de caractères spéciaux"
    },
    "clientDeliveryAdress": {
        "regex": regex.regexStringInt,
        "errorMessage": "L'adresse n'est pas conforme"
    },
    "clientDeliveryZipCode": {
        "regex": regex.regexInt,
        "errorMessage": "Le code postal ne doit pas contenir de caractères spéciaux"
    },
    "clientDeliveryCity": {
        "regex": regex.regexString,
        "errorMessage": "La ville ne doit pas contenir de caractères spéciaux"
    },

};

export const allUpdateConnctedUserFields = {
    "userLastName": {
        "regex": regex.regexString,
        "errorMessage": "Le nom ne doit pas contenir de caractères spéciaux"
    },
    "userFirstName": {
        "regex": regex.regexString,
        "errorMessage": "Le prénom ne doit pas contenir de caractères spéciaux"
    },
    "userEmail": {
        "regex": regex.regexEmail,
        "errorMessage": "L'email n'est pas conforme"
    },
    "userPhoneNumber": {
        "regex": regex.regexInt,
        "errorMessage": "Le numéro de téléphone ne doit pas contenir de caractères spéciaux"
    },
};