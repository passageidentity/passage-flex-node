import { PassageFlex } from '../PassageFlex';

describe('Auth e2e', () => {
    const expectedAppId = process.env.TEST_APP_ID ?? 'key';
    const expectedApiKey = process.env.TEST_API_KEY ?? 'key';

    let passage: PassageFlex;

    beforeAll(() => {
        passage = new PassageFlex({
            appId: expectedAppId,
            apiKey: expectedApiKey,
        });
    });

    describe('createRegisterTransaction', () => {
        it('should return the transaction ID', async () => {
            const transactionId = await passage.auth.createRegisterTransaction({
                externalId: 'test',
                passkeyDisplayName: 'test',
            });
            expect(transactionId).toEqual(expect.any(String));
        });
    });

    describe('createAuthenticateTransaction', () => {
        it('should return the transaction ID', async () => {
            const transactionId = await passage.auth.createAuthenticateTransaction('test');
            expect(transactionId).toEqual(expect.any(String));
        });
    });

    describe('verifyNonce', () => {
        it('should throw an error if the nonce is invalid', async () => {
            await expect(passage.auth.verifyNonce('invalid')).rejects.toThrow(
                'nonce is invalid, expired, or cannot be found',
            );
        });
    });
});
