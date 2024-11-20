import { AuthenticateApi, ResponseError, TransactionsApi } from '../../generated';
import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import { PassageError } from '../PassageError';
import { RegisterTransactionArgs } from './types';

/**
 * Auth class that provides methods for creating and validating passkey transactions.
 */
export class Auth extends PassageBase {

    private readonly transactionClient: TransactionsApi;
    private readonly authClient: AuthenticateApi;

    /**
     * Auth class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    constructor(config: PassageInstanceConfig) {
        super(config);
        this.transactionClient = new TransactionsApi(config.apiConfiguration);
        this.authClient = new AuthenticateApi(config.apiConfiguration);
    }

    /**
     * Create a transaction to start a user's registration process
     *
     * @param {RegisterTransactionArgs} args The required values to create a transaction
     * @return {Promise<string>} The transaction ID
     */
    public async createRegisterTransaction(args: RegisterTransactionArgs): Promise<string> {
        try {
            const response = await this.transactionClient.createRegisterTransaction({
                appId: this.config.appId,
                createTransactionRegisterRequest: args,
            });

            return response.transactionId;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError('Could not create register transaction', err);
            }

            throw err;
        }
    }

    /**
     * Create a transaction to start a user's authentication process
     *
     * @param {string} externalId The external ID of the user to authenticate
     * @return {Promise<string>} The transaction ID
     */
    public async createAuthenticateTransaction(externalId: string): Promise<string> {
        try {
            const response = await this.transactionClient.createAuthenticateTransaction({
                appId: this.config.appId,
                createTransactionAuthenticateRequest: {externalId},
            });

            return response.transactionId;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError('Could not create authenticate transaction', err);
            }

            throw err;
        }
    }

    /**
     * Verify the nonce received from a WebAuthn registration or authentication ceremony
     *
     * @param {string} nonce The nonce to verify
     * @return {Promise<string>} The unique identifier of the user associated with the nonce
     */
    public async verifyNonce(nonce: string): Promise<string> {
        try {
            const response = await this.authClient.authenticateVerifyNonce({
                appId: this.config.appId,
                body: {
                    nonce,
                },
            });

            return response.externalId;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError('Could not verify nonce', err);
            }

            throw err;
        }
    }
}
