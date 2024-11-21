import { PassageFlex } from '../src/classes/PassageFlex';
import { WebAuthnDevices, WebAuthnType } from '../src/generated';

require('dotenv').config();

describe('PassageFlex', () => {
    const expectedAppId = process.env.TEST_APP_ID ?? '';
    const expectedApiKey = process.env.TEST_API_KEY ?? '';
    const userId = process.env.TEST_USER_ID ?? '';
    const userExternalId = process.env.TEST_USER_IDENTIFIER ?? '';

    describe('constructor', () => {
        const expectedErrorMessage =
            'A Passage appId and apiKey are required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.';

        it.each([''])('should throw an error if appId is %s', (appId) => {
            expect(() => {
                new PassageFlex({
                    appId,
                    apiKey: expectedApiKey,
                });
            }).toThrow(expectedErrorMessage);
        });

        it.each([''])('should throw an error if apiKey is %s', (apiKey) => {
            expect(() => {
                new PassageFlex({
                    appId: expectedAppId,
                    apiKey,
                });
            }).toThrow(expectedErrorMessage);
        });

        it.each([''])('should throw an error if appID and apiKey are %s', (value) => {
            expect(() => {
                new PassageFlex({
                    appId: value,
                    apiKey: value,
                });
            }).toThrow(expectedErrorMessage);
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
            const transactionId = await passage.auth.createRegisterTransaction({
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
            const transactionId = await passage.auth.createAuthenticateTransaction('test');
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
            await expect(passage.auth.verifyNonce('invalid')).rejects.toThrow(
                'Could not verify nonce: nonce is invalid, expired, or cannot be found',
            );
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
            const user = await passage.user.get(userExternalId);
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
            await expect(passage.user.get('invalid')).rejects.toThrow('Could not find user with that external ID');
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
            const devices = await passage.user.listDevices(userExternalId);
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
            await expect(passage.user.listDevices('invalid')).rejects.toThrow('Could not find user with that external ID');
        });
    });

    describe('revokeDevice', () => {
        // NOTE revokeDevice is not tested because it is impossible to spoof webauthn to create a device to then revoke
    });
});
