import { ResponseError } from '../../generated';
import { PassageErrorCode } from './types';
/**
 * PassageError Class used to handle errors from PassageFlex
 */
export class PassageError extends Error {
    override name: 'PassageError' = 'PassageError';

    /**
     * Initialize a new PassageError instance.
     * @param {number} statusCode status code from PassageFlex API
     * @param {string} errorCode error code from PassageFlex API
     * @param {string} message friendly message
     */
    private constructor(public readonly statusCode: number, public readonly errorCode: PassageErrorCode, public readonly message: string) {
        super(message);

    }
    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message
     * @param {ResponseError} err error from node-fetch request
     * @return {Promise<PassageError>}
     */
    public static async fromResponseError(message: string, err: ResponseError): Promise<PassageError> {
        const body: { code: PassageErrorCode; error: string } = await err.response.json();
        return new PassageError(err.response.status, body.code, body.error);
    }
}
