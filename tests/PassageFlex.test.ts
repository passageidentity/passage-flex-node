import { PassageError } from '../src/classes/PassageError';
import { PassageFlex } from '../src/classes/PassageFlex';
import { AppInfo } from '../src/models/AppInfo';
import { WebAuthnDevices, WebAuthnType } from '../src/generated';

require('dotenv').config();

describe('PassageFlex', () => {
    const expectedAppId = process.env.TEST_APP_ID;
    const expectedApiKey = process.env.TEST_API_KEY;
    const userId = process.env.TEST_USER_ID;
    const userExternalId = process.env.TEST_USER_IDENTIFIER;

    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appId is %s', (appId) => {
            expect(() => {
                new PassageFlex({
                    appId,
                    apiKey: expectedApiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if apiKey is %s', (apiKey) => {
            expect(() => {
                new PassageFlex({
                    appId: expectedAppId,
                    apiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if appID and apiKey are %s', (value) => {
            expect(() => {
                new PassageFlex({
                    appId: value,
                    apiKey: value,
                });
            }).toThrow(PassageError);
        });
    });

    describe('getApp', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it('should return the app info', async () => {
            const app = await passage.getApp();
            expect(app).toStrictEqual<AppInfo>({
                id: expectedAppId,
                name: expect.any(String),
                authOrigin: expect.any(String),
            });
        });

        it('should throw an error if the app does not exist', async () => {
            const passage = new PassageFlex({
                appId: 'invalid',
                apiKey: expectedApiKey,
            });
            await expect(passage.getApp()).rejects.toThrow(PassageError);
        });
    });

    describe('createRegisterTransaction', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it('should return the transaction ID', async () => {
            const transactionId = await passage.createRegisterTransaction({
                externalId: 'test',
                passkeyDisplayName: 'test',
            });
            expect(transactionId).toEqual(expect.any(String));
        });
    });

    describe('createAuthenticateTransaction', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it('should return the transaction ID', async () => {
            const transactionId = await passage.createAuthenticateTransaction({
                externalId: 'test',
            });
            expect(transactionId).toEqual(expect.any(String));
        });
    });

    describe('verifyNonce', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it('should throw an error if the nonce is invalid', async () => {
            await expect(passage.verifyNonce('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('getUser', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it('should return the user info', async () => {
            const user = await passage.getUser(userExternalId);
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
            await expect(passage.getUser('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('getDevices', () => {
        let passage: PassageFlex;

        beforeEach(() => {
            passage = new PassageFlex({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
        });

        it("should return the user's devices", async () => {
            const devices = await passage.getDevices(userExternalId);
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
            await expect(passage.getDevices('invalid')).rejects.toThrow(PassageError);
        });
    });

    describe('revokeDevice', () => {
        // NOTE revokeDevice is not tested because it is impossible to spoof webauthn to create a device to then revoke
    });
});
