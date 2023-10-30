import { expect, test, describe } from 'vitest';
import { getErrorsObject } from '@/utils/getErrorObject.js';
import { regex } from '@/utils/formFields.js';

describe('form validation', () => {
    test('for empty value it should return an object with an error message, field is empty', () => {
        const emptyFormValues = {
            "formField": ""
        }
        const regExp = regex;

        const emptyFormFields = {
            "formField": {
                "regex": regex.regexString,
                "errorMessage": "Le champ ne doit pas contenir de caractères spéciaux"
            },
        }

        expect(getErrorsObject(emptyFormValues, emptyFormFields, regExp)).toStrictEqual({ "formField": "Le champ est vide" });
    });

    test('for a wrong string input it hould return an object with an error message for letters input, value cannot contain special characters', () => {
        const wrongFormValues = {
            "formField": "123*AZERrtyu"
        }
        const regExp = regex;

        const formFields = {
            "formField": {
                "regex": regex.regexString,
                "errorMessage": "Le champ ne doit pas contenir de caractères spéciaux"
            },
        }

        expect(getErrorsObject(wrongFormValues, formFields, regExp)).toStrictEqual({ "formField": "Le champ ne doit pas contenir de caractères spéciaux" });
    });

    test('for a right string input should return an empty object', () => {
        const stringFormValues = {
            "formField": "hello"
        }
        const regExp = regex;

        const formFields = {
            "formField": {
                "regex": regex.regexString,
                "errorMessage": "Le champ ne doit pas contenir de caractères spéciaux"
            },
        }
        expect(getErrorsObject(stringFormValues, formFields, regExp)).toStrictEqual({});
    });

    test('for a wrong string with number input it should return an object with an error message for number input, value cannot contain special characters', () => {
        const wrongFormValues = {
            "formField": "azerty**@"
        }
        const regExp = regex;

        const formFields = {
            "formField": {
                "regex": regex.regexInt,
                "errorMessage": "Le champ ne doit pas contenir de caractères spéciaux"
            },
        }

        expect(getErrorsObject(wrongFormValues, formFields, regExp)).toStrictEqual({ "formField": "Le champ ne doit pas contenir de caractères spéciaux" });
    });
    test('for a right string with number input it should return an empty object', () => {
        const formValues = {
            "formField": "123"
        }
        const regExp = regex;

        const formFields = {
            "formField": {
                "regex": regex.regexInt,
                "errorMessage": "Le champ ne doit pas contenir de caractères spéciaux"
            },
        }

        expect(getErrorsObject(formValues, formFields, regExp)).toStrictEqual({});
    });
    test('for a wrong string email it should return an object with an error message for email input, email does not comply', () => {
        const wrongFormValues = {
            "formField": "123"
        }
        const regExp = regex;

        const emptyFormFields = {
            "formField": {
                "regex": regex.regexEmail,
                "errorMessage": "L'email n'est pas conforme"
            },
        }

        expect(getErrorsObject(wrongFormValues, emptyFormFields, regExp)).toStrictEqual({ "formField": "L'email n'est pas conforme" });
    });
    test('for a right string input it should return an empty object', () => {
        const wrongFormValues = {
            "formField": "test.test@mail.com"
        }
        const regExp = regex;

        const emptyFormFields = {
            "formField": {
                "regex": regex.regexEmail,
                "errorMessage": "L'email n'est pas conforme"
            },
        }

        expect(getErrorsObject(wrongFormValues, emptyFormFields, regExp)).toStrictEqual({});
    });
});