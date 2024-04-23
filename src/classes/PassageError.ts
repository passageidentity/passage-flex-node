import {
    Model400ErrorCodeEnum,
    Model401ErrorCodeEnum,
    Model403ErrorCodeEnum,
    Model404ErrorCodeEnum,
    Model409ErrorCodeEnum,
    Model500ErrorCodeEnum,
    ResponseError,
} from '../generated';

export const ErrorStatusText = {
    ...Model400ErrorCodeEnum,
    ...Model401ErrorCodeEnum,
    ...Model403ErrorCodeEnum,
    ...Model404ErrorCodeEnum,
    ...Model409ErrorCodeEnum,
    ...Model500ErrorCodeEnum,
};

type ErrorStatusText = (typeof ErrorStatusText)[keyof typeof ErrorStatusText];
type APIResponseError = { statusCode: number; statusText: ErrorStatusText; errorMessage: string };

/**
 * PassageError Class used to handle errors from PassageFlex
 */
export class PassageError extends Error {
    public readonly statusCode: number | undefined;
    public readonly statusText: ErrorStatusText | undefined;

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

        this.message = `${message}: ${response.errorMessage}`;
        this.statusCode = response.statusCode;
        this.statusText = response.statusText;
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
        const body: { code: ErrorStatusText; error: string } = await err.response.json();
        return new PassageError(message, {
            statusCode: err.response.status,
            statusText: body.code,
            errorMessage: body.error,
        });
    }
}
