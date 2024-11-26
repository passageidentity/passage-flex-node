import { PassageError } from './PassageError';
import { ResponseError } from '../../generated';
import { PassageErrorCode } from './types';

describe('PassageError', () => {
    describe('fromResponseError', () => {
        it('should create PassageError from ResponseError', async () => {
            // Mock ResponseError with JSON body
            const mockResponse = {
                status: 400,
                json: jest.fn().mockResolvedValue({
                    code: PassageErrorCode.InvalidRequest,
                    error: 'Invalid request parameters',
                }),
            };
            const responseError = new ResponseError(mockResponse as unknown as Response);

            const passageError = await PassageError.fromResponseError(responseError);

            expect(passageError).toBeInstanceOf(PassageError);
            expect(passageError.name).toBe('PassageError');
            expect(passageError.statusCode).toBe(400);
            expect(passageError.errorCode).toBe(PassageErrorCode.InvalidRequest);
            expect(passageError.message).toBe('Invalid request parameters');
        });

        it('should handle ResponseError with invalid JSON response', async () => {
            // Mock ResponseError with failing JSON parse
            const mockResponse = {
                status: 500,
                json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
            };
            const responseError = new ResponseError(mockResponse as unknown as Response);

            const passageError = await PassageError.fromResponseError(responseError);

            expect(passageError).toBeInstanceOf(PassageError);
            expect(passageError.name).toBe('PassageError');
            expect(passageError.statusCode).toBe(500);
            expect(passageError.errorCode).toBe(PassageErrorCode.InternalServerError);
            expect(passageError.message).toBe('Unknown error occured.');
        });
    });
});
