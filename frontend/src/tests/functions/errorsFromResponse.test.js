import { expect, test, describe } from 'vitest';
import { setErrorsFromResponseStatus } from "@/utils/setErrorsFromResponseStatus";

describe("return the right message depending on status response code", () => {
  test("should return Une erreur est survenue for response status 404", () => {
    const responseStatusCode = 404;
    expect(setErrorsFromResponseStatus(responseStatusCode)).toStrictEqual("Une erreur est survenue");
  })

  test("should return Vous n'êtes pas autorisé à executer cette action for response status 401", () => {
    const responseStatusCode = 401;
    expect(setErrorsFromResponseStatus(responseStatusCode)).toStrictEqual("Vous n'êtes pas autorisé à executer cette action");
  })

  test("should return Une erreur du serveur est survenue for response status 500", () => {
    const responseStatusCode = 500;
    expect(setErrorsFromResponseStatus(responseStatusCode)).toStrictEqual("Une erreur du serveur est survenue");
  })

  test("should return the error message from the response for response status 422", () => {
    const responseStatusCode = 422;
    const errorMessageFromResponse = { message: "Error Message from Response"}
    expect(setErrorsFromResponseStatus(responseStatusCode, errorMessageFromResponse)).toStrictEqual("Error Message from Response");
  })
});