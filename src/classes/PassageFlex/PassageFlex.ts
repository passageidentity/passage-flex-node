import { PassageConfig } from '../../types/PassageConfig';
import { PassageError } from '../PassageError';
import {
    AppsApi,
    AuthenticateApi,
    Configuration,
    CreateTransactionAuthenticateRequest,
    CreateTransactionRegisterRequest,
    ResponseError,
    TransactionsApi,
    UserDevicesApi,
    UsersApi,
    WebAuthnDevices,
} from '../../generated';
import apiConfiguration from '../../utils/apiConfiguration';
import { AppInfo } from '../../models/AppInfo';
import { UserInfo } from '../../models/UserInfo';

/**
 * PassageFlex class used to get app info, create transactions, and verify nonces
 */
export class PassageFlex {
    public readonly apiKey: string;
    public readonly appId: string;
    private readonly configuration: Configuration;
    private readonly appClient: AppsApi;
    private readonly transactionClient: TransactionsApi;
    private readonly authClient: AuthenticateApi;
    private readonly userClient: UsersApi;
    private readonly deviceClient: UserDevicesApi;

    /**
     * Initialize a new PassageFlex instance
     * @param {PassageConfig} config The default config for Passage initialization
     */
    public constructor(config: PassageConfig) {
        if (!config.appId || !config.apiKey) {
            throw PassageError.fromMessage(
                'A Passage appId and apiKey are required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        }

        this.appId = config.appId;
        this.apiKey = config.apiKey;

        this.configuration = apiConfiguration({
            accessToken: this.apiKey,
        });
        this.appClient = new AppsApi(this.configuration);
        this.transactionClient = new TransactionsApi(this.configuration);
        this.authClient = new AuthenticateApi(this.configuration);
        this.userClient = new UsersApi(this.configuration);
        this.deviceClient = new UserDevicesApi(this.configuration);
    }

    /**
     * Get App Info about an app
     *
     * @return {Promise<AppInfo>} Passage App object
     */
    public async getApp(): Promise<AppInfo> {
        try {
            const response = await this.appClient.getApp({
                appId: this.appId,
            });

            const { id, name, authOrigin } = response.app;
            const appInfo: AppInfo = {
                id,
                name,
                authOrigin,
            };

            return appInfo;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError('Could not fetch app', err);
            }

            throw err;
        }
    }

    /**
     * Create a transaction to start a user's registration process
     *
     * @param {CreateTransactionRegisterRequest} args The required values to create a transaction
     * @return {Promise<string>} The transaction ID
     */
    public async createRegisterTransaction(args: CreateTransactionRegisterRequest): Promise<string> {
        try {
            const response = await this.transactionClient.createRegisterTransaction({
                appId: this.appId,
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
     * @param {CreateTransactionAuthenticateRequest} args The required values to create a transaction
     * @return {Promise<string>} The transaction ID
     */
    public async createAuthenticateTransaction(args: CreateTransactionAuthenticateRequest): Promise<string> {
        try {
            const response = await this.transactionClient.createAuthenticateTransaction({
                appId: this.appId,
                createTransactionAuthenticateRequest: args,
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
                appId: this.appId,
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

    /**
     * Get a user by their external ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @return {Promise<UserInfo>} Passage User object
     */
    public async getUser(externalId: string): Promise<UserInfo> {
        try {
            const response = await this.userClient.listPaginatedUsers({
                appId: this.appId,
                limit: 1,
                identifier: externalId,
            });

            const users = response.users;
            if (!users.length) {
                throw PassageError.fromMessage('Could not find user with that external ID');
            }

            return await this.getUserById(users[0].id);
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError('Could not fetch user by external ID', err);
            }

            throw err;
        }
    }

    /**
     * Get a user's devices by their external ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @return {Promise<WebAuthnDevices[]>} List of devices
     */
    public async getDevices(externalId: string): Promise<WebAuthnDevices[]> {
        try {
            const user = await this.getUser(externalId);
            const response = await this.deviceClient.listUserDevices({
                appId: this.appId,
                userId: user.id,
            });

            return response.devices;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError("Could not fetch user's devices", err);
            }

            throw err;
        }
    }

    /**
     * Revoke a user's device by their external ID and the device ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @param {string} deviceId The Passage user's device ID
     * @return {Promise<boolean>}
     */
    public async revokeDevice(externalId: string, deviceId: string): Promise<boolean> {
        try {
            const user = await this.getUser(externalId);
            await this.deviceClient.deleteUserDevices({
                appId: this.appId,
                deviceId: deviceId,
                userId: user.id,
            });

            return true;
        } catch (err) {
            if (err instanceof ResponseError) {
                throw await PassageError.fromResponseError("Could not delete user's device", err);
            }

            throw err;
        }
    }

    /**
     * Get a user by their user ID
     *
     * @param {string} userId The Passage user ID
     * @return {Promise<UserInfo>} Passage User object
     */
    private async getUserById(userId: string): Promise<UserInfo> {
        const response = await this.userClient.getUser({
            appId: this.appId,
            userId: userId,
        });

        const userInfo: UserInfo = {
            createdAt: response.user.createdAt,
            id: response.user.id,
            lastLoginAt: response.user.lastLoginAt,
            loginCount: response.user.loginCount,
            status: response.user.status,
            updatedAt: response.user.updatedAt,
            userMetadata: response.user.userMetadata,
            webauthn: response.user.webauthn,
            webauthnDevices: response.user.webauthnDevices,
            webauthnTypes: response.user.webauthnTypes,
        };

        return userInfo;
    }
}
