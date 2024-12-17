import { PassageFlex } from '../PassageFlex';
import { WebAuthnDevices, WebAuthnType } from './types';

describe('User e2e', () => {
    const expectedAppId = process.env.TEST_APP_ID ?? 'key';
    const expectedApiKey = process.env.TEST_API_KEY ?? 'key';
    const userId = process.env.TEST_USER_ID ?? '';
    const userExternalId = process.env.TEST_USER_IDENTIFIER ?? '';

    let passage: PassageFlex;

    beforeAll(() => {
        passage = new PassageFlex({
            appId: expectedAppId,
            apiKey: expectedApiKey,
        });
    })

    describe('getUser', () => {
        it('should return the user info', async () => {
            const actual = await passage.user.get(userExternalId);
            expect(actual).toStrictEqual({
                /* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
                /* eslint-enable @typescript-eslint/no-unsafe-assignment */
            });
        });

        it('should throw an error if the user does not exist', async () => {
            await expect(passage.user.get('invalid')).rejects.toThrow('Could not find user with that external ID');
        });
    });

    describe('getDevices', () => {
        it("should return the user's devices", async () => {
            const devices = await passage.user.listDevices(userExternalId);
            expect(devices).toStrictEqual([
                {
                    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
                    id: expect.any(String),
                    credId: expect.any(String),
                    friendlyName: expect.any(String),
                    type: expect.any(String),
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                    lastLoginAt: expect.any(Date),
                    usageCount: expect.any(Number),
                    icons: expect.any(Object),
                    /* eslint-enable @typescript-eslint/no-unsafe-assignment */
                },
            ]);
        });

        it('should throw an error if the user does not exist', async () => {
            await expect(passage.user.listDevices('invalid')).rejects.toThrow('Could not find user with that external ID');
        });
    });
});