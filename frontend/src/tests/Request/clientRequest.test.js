import { test, describe } from 'vitest';
import { faker } from '@faker-js/faker';
const nock = require('nock')

describe("Test for request on API clients endpoints", () => {
    test('test add new client', async () => {
        const token = localStorage.getItem("woodStockPlainTextToken");
        const newClientRequestBody = {
            last_name: faker.person.lastName(),
            first_name: faker.person.firstName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            billing_address: faker.location.streetAddress(false),
            billing_zip_code: faker.location.zipCode('######'),
            billing_city: faker.location.city(),
            delivery_address: faker.location.streetAddress(false),
            delivery_zip_code: faker.location.zipCode('######'),
            delivery_city: faker.location.city(),
            company_id: 1
        }

        nock('http://192.168.1.15:8080',)
            .post('/api/clients/', newClientRequestBody,)
            .matchHeader('Authorization', `Bearer ${token}`)
            .reply(201, { data: newClientRequestBody });


    })
});