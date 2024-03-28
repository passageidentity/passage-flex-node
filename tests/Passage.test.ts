import Passage from '../src/index';
import { PassageError } from '../src/classes/PassageError';

require('dotenv').config();

describe('Passage', () => {
    const expectedAppID = process.env.TEST_APP_ID;

    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appID is %s', (appID) => {
            expect(() => {
                new Passage({ appID });
            }).toThrow(PassageError);
        });
    });

    describe('getApp', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appID: expectedAppID,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should return the app info', async () => {
            const app = await passage.getApp();
            expect(app).toStrictEqual({
                id: expectedAppID,
                name: expect.any(String),
                authOrigin: expect.any(String),
            });
        });

        it('should throw an error if the app does not exist', async () => {
            const passage = new Passage({
                appID: 'invalid',
                apiKey: process.env.TEST_API_KEY,
            });
            await expect(passage.getApp()).rejects.toThrow(PassageError);
        });
    });

    describe('createTransaction', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appID: expectedAppID,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should return the transaction ID', async () => {
            const transactionID = await passage.createTransaction({
                externalId: 'test',
                passkeyDisplayName: 'test',
            });
            expect(transactionID).toEqual(expect.any(String));
        });
    });

    describe('verifyNonce', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appID: expectedAppID,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should throw an error if the nonce is invalid', async () => {
            await expect(passage.verifyNonce('invalid')).rejects.toThrow(PassageError);
        });
    });
});
