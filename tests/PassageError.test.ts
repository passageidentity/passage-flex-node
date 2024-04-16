import { ResponseError } from '../src/generated';
import { PassageError } from '../src/classes/PassageError';
import { faker } from '@faker-js/faker';

describe('PassageError', () => {
    describe('fromMessage', () => {
        it('should set PassageError.message to message', async () => {
            const expected = faker.string.sample();
            const actual = PassageError.fromMessage(expected);

            expect(actual.message).toEqual(expected);
            expect(actual.stack).toBeDefined();
            expect(actual.statusText).toBeUndefined();
            expect(actual.statusCode).toBeUndefined();
        });
    });

    describe('fromResponseError', () => {
        it('should set PassageError.code and PassageError.status from ResponseError', async () => {
            const expectedMessage = 'friendly message';
            const expectedResponseCode = faker.string.sample();
            const expectedResponseError = 'error body message';

            const responseError = {
                message: faker.string.sample(),
                response: {
                    status: faker.internet.httpStatusCode(),
                    json: async () => {
                        return {
                            code: expectedResponseCode,
                            error: expectedResponseError,
                        };
                    },
                } as Response,
            } as ResponseError;

            const actual = await PassageError.fromResponseError(expectedMessage, responseError);

            expect(actual.message).toEqual(`${expectedMessage}: ${expectedResponseError}`);
            expect(actual.statusText).toEqual(expectedResponseCode);
            expect(actual.statusCode).toEqual(responseError.response.status);
            expect(actual.stack).toBeDefined();
        });
    });
});
