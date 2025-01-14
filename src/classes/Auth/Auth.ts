import { AuthenticateApi, TransactionsApi } from '../../generated';
import { PassageBase, PassageInstanceConfig } from '../PassageBase';

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
    public constructor(config: PassageInstanceConfig) {
        super(config);
        this.transactionClient = new TransactionsApi(config.apiConfiguration);
        this.authClient = new AuthenticateApi(config.apiConfiguration);
    }

    /**
     * Create a transaction to start a user's registration process
     *
     * @param {string} externalId The external ID of the user to register
     * @param {string} passkeyDisplayName The display name of the passkey to use
     * @return {Promise<string>} The transaction ID
     */
    public async createRegisterTransaction(externalId: string, passkeyDisplayName: string): Promise<string> {
        try {
            const response = await this.transactionClient.createRegisterTransaction({
                appId: this.config.appId,
                registerTransactionArgs: {
                    externalId,
                    passkeyDisplayName,
                },
            });

            return response.transactionId;
        } catch (err) {
            throw await this.parseError(err);
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
                createTransactionAuthenticateRequest: { externalId },
            });

            return response.transactionId;
        } catch (err) {
            throw await this.parseError(err);
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
            throw await this.parseError(err);
        }
    }
}
