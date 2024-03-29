import { PassageConfig } from '../types/PassageConfig';
import apiConfiguration from '../utils/apiConfiguration';

import { Configuration, ResponseError, UserDevicesApi, UsersApi, WebAuthnDevices } from '../generated';
import { PassageError } from './PassageError';
import { UserInfo } from '../models/UserInfo';

/**
 * Users class used to get user info and manage user devices
 */
export class Users {
    private readonly appId: string;
    private readonly apiKey: string;
    private readonly configuration: Configuration;
    private readonly userClient: UsersApi;
    private readonly deviceClient: UserDevicesApi;

    /**
     * Initialize a new Passage User instance
     *
     * @param {PassageConfig} config The default config for Passage and User initialization
     */
    public constructor(config: PassageConfig) {
        if (!config.appId || !config.apiKey) {
            throw new PassageError(
                'A Passage appId and apiKey are required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        }

        this.appId = config.appId;
        this.apiKey = config.apiKey;

        this.configuration = apiConfiguration({
            accessToken: this.apiKey,
        });

        this.userClient = new UsersApi(this.configuration);
        this.deviceClient = new UserDevicesApi(this.configuration);
    }

    /**
     * Check if API key exists for this Passage instance
     * @throws {PassageError} If the API key is missing
     */
    private apiKeyCheck(): void {
        if (!this.apiKey) {
            throw new PassageError('A Passage API key is needed');
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

    /**
     * Get a user by their external ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @return {Promise<UserInfo>} Passage User object
     */
    public async getUser(externalId: string): Promise<UserInfo> {
        this.apiKeyCheck();

        try {
            const response = await this.userClient.listPaginatedUsers({
                appId: this.appId,
                limit: 1,
                identifier: externalId,
            });

            const users = response.users;
            if (!users.length) {
                throw new PassageError('Could not find user with that external ID');
            }

            return await this.getUserById(users[0].id);
        } catch (err) {
            throw new PassageError('Could not fetch user by external ID', err as ResponseError);
        }
    }

    /**
     * Get a user's devices by their external ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @return {Promise<WebAuthnDevices[]>} List of devices
     */
    public async getDevices(externalId: string): Promise<WebAuthnDevices[]> {
        this.apiKeyCheck();

        try {
            const user = await this.getUser(externalId);
            const response = await this.deviceClient.listUserDevices({
                appId: this.appId,
                userId: user.id,
            });

            return response.devices;
        } catch (err) {
            throw new PassageError("Could not fetch user's devices", err as ResponseError);
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
        this.apiKeyCheck();

        try {
            const user = await this.getUser(externalId);
            await this.deviceClient.deleteUserDevices({
                appId: this.appId,
                deviceId: deviceId,
                userId: user.id,
            });

            return true;
        } catch (err) {
            throw new PassageError("Could not delete user's device", err as ResponseError);
        }
    }
}
