export const setErrorsFromResponseStatus = (statusCode, errorMessage) => {
    console.log("🚀 ~ file: setErrorsFromResponseStatus.js:2 ~ setErrorsFromResponseStatus ~ errorMessage:", errorMessage)

    console.log("🚀 ~ file: setErrorsFromResponseStatus.js:2 ~ setErrorsFromResponseStatus ~ statusCode:", statusCode)

    switch (statusCode) {
        case 401:
            return "Vous n'êtes pas autorisé à executer cette action";
        case 404:
            return "Une erreur est survenue";
        case 500:
            return "Une erreur du serveur est survenue";
        case 422:
            return errorMessage.message
        default:
            break;
    }

}