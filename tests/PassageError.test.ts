import { ResponseError } from '../src/generated';
import { PassageError } from '../src/classes/PassageError';
import { faker } from '@faker-js/faker';

describe('PassageError', () => {
    describe('fromResponseError', () => {
        it('should set PassageError.code and PassageError.status from ResponseError', async () => {
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

            const actual = await PassageError.fromResponseError(responseError);

            expect(actual.message).toEqual(expectedResponseError);
            expect(actual.errorCode).toEqual(expectedResponseCode);
            expect(actual.statusCode).toEqual(responseError.response.status);
            expect(actual.stack).toBeDefined();
        });
    });
});
