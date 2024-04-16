import { ResponseError } from '../generated';

type APIResponseError = { statusCode: number; errorCode: string; message: string };

/**
 * PassageError Class used to handle errors from PassageFlex
 */
export class PassageError extends Error {
    public readonly statusCode: number | undefined;
    public readonly statusText: string | undefined;

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message
     * @param {APIResponseError} response error information from PassageFlex API
     */
    private constructor(message: string, response?: APIResponseError) {
        super(message);

        if (!response) {
            return;
        }

        this.message = `${message}: ${response.message}`;
        this.statusCode = response.statusCode;
        this.statusText = response.errorCode;
    }

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message
     * @return {PassageError}
     */
    public static fromMessage(message: string): PassageError {
        return new PassageError(message);
    }

    /**
     * Initialize a new PassageError instance.
     * @param {string} message friendly message
     * @param {ResponseError} err error from node-fetch request
     * @return {Promise<PassageError>}
     */
    public static async fromResponseError(message: string, err: ResponseError): Promise<PassageError> {
        const body: { code: string; error: string } = await err.response.json();
        return new PassageError(message, {
            statusCode: err.response.status,
            errorCode: body.code,
            message: body.error,
        });
    }
}
