import { PassageError } from '../src/classes/PassageError';
import Users from '../src/classes/Users';
import { WebAuthnType } from '../src/generated';
import { WebAuthnDevices } from '../src/models';

require('dotenv').config();

describe('Users', () => {
    const expectedAppId = process.env.TEST_APP_ID;
    const userId = process.env.TEST_USER_ID ?? '';
    const userExternalId = process.env.TEST_USER_IDENTIFIER ?? '';

    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appId is %s', (appId) => {
            expect(() => {
                new Users({ appId });
            }).toThrow(PassageError);
        });
    });

    describe('getUser', () => {
        let users: Users;

        beforeEach(() => {
            users = new Users({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should return the user info', async () => {
            const user = await users.getUser(userId);
            expect(user).toStrictEqual({
                id: userId,
                createdAt: expect.any(Date),
                lastLoginAt: expect.any(Date),
                loginCount: expect.any(Number),
                status: expect.any(String),
                updatedAt: expect.any(Date),
                userMetadata: expect.any(Object),
                webauthn: expect.any(Boolean),
                webauthnDevices: expect.any(Array<WebAuthnDevices>),
                webauthnTypes: expect.any(Array<WebAuthnType>),
            });
        });

        it('should throw an error if the user does not exist', async () => {
            await expect(users.getUser('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('getUserByExternalId', () => {
        let users: Users;

        beforeEach(() => {
            users = new Users({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should return the user info', async () => {
            const user = await users.getUserByExternalId(userExternalId);
            expect(user).toStrictEqual({
                id: userId,
                createdAt: expect.any(Date),
                lastLoginAt: expect.any(Date),
                loginCount: expect.any(Number),
                status: expect.any(String),
                updatedAt: expect.any(Date),
                userMetadata: expect.any(Object),
                webauthn: expect.any(Boolean),
                webauthnDevices: expect.any(Array<WebAuthnDevices>),
                webauthnTypes: expect.any(Array<WebAuthnType>),
            });
        });

        it('should throw an error if the user does not exist', async () => {
            await expect(users.getUserByExternalId('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('listDevices', () => {
        let users: Users;

        beforeEach(() => {
            users = new Users({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it("should return the user's devices", async () => {
            const devices = await users.listDevices(userExternalId);
            expect(devices).toStrictEqual([
                {
                    id: expect.any(String),
                    credId: expect.any(String),
                    friendlyName: expect.any(String),
                    type: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                    lastLoginAt: expect.any(Date),
                    usageCount: expect.any(Number),
                    icons: expect.any(Object),
                },
            ]);
        });

        it('should throw an error if the user does not exist', async () => {
            await expect(users.listDevices('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('revokeDevices', () => {
        // NOTE revokeDevice is not tested because it is impossible to spoof webauthn to create a device to then revoke
    })
});
