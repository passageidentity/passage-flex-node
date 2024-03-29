import { PassageError } from '../src/classes/PassageError';
import {Users} from '../src/classes/Users';
import { WebAuthnDevices, WebAuthnType } from '../src/generated';

require('dotenv').config();

describe('Users', () => {
    const expectedAppId = process.env.TEST_APP_ID;
    const expectedApiKey = process.env.TEST_API_KEY;
    const userId = process.env.TEST_USER_ID;
    const userExternalId = process.env.TEST_USER_IDENTIFIER;

    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appId is %s', (appId) => {
            expect(() => {
                new Users({
                    appId,
                    apiKey: expectedApiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if apiKey is %s', (apiKey) => {
            expect(() => {
                new Users({
                    appId: expectedAppId,
                    apiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if appID and apiKey are %s', (value) => {
            expect(() => {
                new Users({
                    appId: value,
                    apiKey: value,
                });
            }).toThrow(PassageError);
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
            const user = await users.getUser(userExternalId);
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

    describe('getDevices', () => {
        let users: Users;

        beforeEach(() => {
            users = new Users({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it("should return the user's devices", async () => {
            const devices = await users.getDevices(userExternalId);
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
            await expect(users.getDevices('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('revokeDevices', () => {
        // NOTE revokeDevice is not tested because it is impossible to spoof webauthn to create a device to then revoke
    });
});
