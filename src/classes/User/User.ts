import { ResponseError, UserDevicesApi, UserInfo, UsersApi, WebAuthnDevices } from '../../generated';
import { PassageBase, PassageInstanceConfig } from '../PassageBase';
import { PassageError } from '../PassageError';
import { PassageUser } from './types';
/**
 * User class for handling operations to get and update user information.
 */
export class User extends PassageBase {
    private readonly userClient: UsersApi;
    private readonly deviceClient: UserDevicesApi;
    /**
     * User class constructor.
     * @param {PassageInstanceConfig} config config properties for Passage instance
     */
    constructor(config: PassageInstanceConfig) {
        super(config);
        this.userClient = new UsersApi(config.apiConfiguration);
        this.deviceClient = new UserDevicesApi(config.apiConfiguration);
    }

    /**
     * Get a user by their external ID
     *
     * @param {string} externalId The external ID used to associate the user with Passage
     * @return {Promise<UserInfo>} Passage User object
     */
    public async getUser(externalId: string): Promise<PassageUser> {
        try {
            const response = await this.userClient.listPaginatedUsers({
                appId: this.config.appId,
                limit: 1,
                identifier: externalId,
            });

            const users = response.users;
            if (!users.length) {
                throw Error('Could not find user with that external ID');
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
                appId: this.config.appId,
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
                appId: this.config.appId,
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
    private async getUserById(userId: string): Promise<PassageUser> {
        const response = await this.userClient.getUser({
            appId: this.config.appId,
            userId: userId,
        });

        return this.mapUserInfoToPassageUser(response.user);
    }
    
    /**
     * Utility function to map the user info to the PassageUser type
     * @param {UserInfo} userInfo UserInfo object
     * @return {PassageUser} PassageUser object
     */
    private mapUserInfoToPassageUser(userInfo: UserInfo): PassageUser {
        return {
            createdAt: userInfo.createdAt,
            id: userInfo.id,
            lastLoginAt: userInfo.lastLoginAt,
            loginCount: userInfo.loginCount,
            status: userInfo.status,
            updatedAt: userInfo.updatedAt,
            userMetadata: userInfo.userMetadata,
            webauthn: userInfo.webauthn,
            webauthnDevices: userInfo.webauthnDevices,
            webauthnTypes: userInfo.webauthnTypes,
        };
    }
}
