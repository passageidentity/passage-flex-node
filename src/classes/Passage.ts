import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';
import { AppsApi, AuthenticateApi, Configuration, ResponseError, TransactionsApi } from '../generated';
import apiConfiguration from '../utils/apiConfiguration';
import { AppInfo } from '../models/AppInfo';
import { TransactionArgs } from '../types/TransactionArgs';

/**
 * Passage Class
 */
export default class Passage {
    public readonly apiKey?: string;
    public readonly appID: string;
    private readonly configuration: Configuration;
    private readonly appClient: AppsApi;
    private readonly transactionClient: TransactionsApi;
    private readonly authClient: AuthenticateApi;

    /**
     * Initialize a new Passage instance.
     * @param {PassageConfig} config The default config for Passage initialization
     */
    public constructor(config: PassageConfig) {
        if (!config.appID) {
            throw new PassageError('A Passage appID is required. Please include {appID: YOUR_APP_ID}.');
        }

        this.appID = config.appID;
        this.apiKey = config.apiKey;
        this.configuration = apiConfiguration({
            accessToken: this.apiKey,
        });
        this.appClient = new AppsApi(this.configuration);
        this.transactionClient = new TransactionsApi(this.configuration);
        this.authClient = new AuthenticateApi(this.configuration);
    }

    /**
     * Get App Info about an app
     *
     * @return {Promise<AppInfo>} Passage App object
     */
    public async getApp(): Promise<AppInfo> {
        try {
            const response = await this.appClient.getApp({
                appId: this.appID,
            });

            const { id, name, auth_origin } = response.app;
            const appInfo: AppInfo = {
                id,
                name,
                authOrigin: auth_origin,
            };

            return appInfo;
        } catch (err) {
            throw new PassageError('Could not fetch app', err as ResponseError);
        }
    }

    /**
     * Create a transaction to start a user's registration or authentication process
     *
     * @param {TransactionArgs} args The required values to create a transaction
     * @return {Promise<string>} The transaction ID
     */
    public async createTransaction(args: TransactionArgs): Promise<string> {
        try {
            const response = await this.transactionClient.createTransaction({
                appId: this.appID,
                createTransactionRequest: {
                    external_id: args.externalId,
                    passkey_display_name: args.passkeyDisplayName,
                },
            });

            return response.transaction_id;
        } catch (err) {
            throw new PassageError('Could not create transaction', err as ResponseError);
        }
    }

    /**
     * Verify the nonce received from a WebAuthn registration or authentication ceremony
     *
     * @param {string} nonce The nonce to verify
     * @return {Promise<boolean>} Whether the nonce was verified
     */
    public async verifyNonce(nonce: string): Promise<boolean> {
        try {
            await this.authClient.authenticateVerifyNonce({
                appId: this.appID,
                body: {
                    nonce,
                },
            });

            return true;
        } catch (err) {
            throw new PassageError('Could not verify nonce', err as ResponseError);
        }
    }
}
