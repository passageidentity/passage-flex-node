import { PassageError } from '../src/classes/PassageError';
import Passage from '../src/classes/Passage';
import Users from '../src/classes/Users';
import { AppInfo } from '../src/models/AppInfo';

require('dotenv').config();

describe('Passage', () => {
    const expectedAppId = process.env.TEST_APP_ID;
    const expectedApiKey = process.env.TEST_API_KEY;

    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appId is %s', (appId) => {
            expect(() => {
                new Passage({
                    appId,
                    apiKey: expectedApiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if apiKey is %s', (apiKey) => {
            expect(() => {
                new Passage({
                    appId: expectedAppId,
                    apiKey,
                });
            }).toThrow(PassageError);
        });

        it.each(['', undefined, null])('should throw an error if appID and apiKey are %s', (value) => {
            expect(() => {
                new Passage({
                    appId: value,
                    apiKey: value,
                });
            }).toThrow(PassageError);
        });

        it('should set the Passage.users property', () => {
            const passage = new Passage({
                appId: expectedAppId,
                apiKey: expectedApiKey,
            });
            expect(passage.users).toBeInstanceOf(Users);
        });
    });

    describe('getApp', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
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
            const passage = new Passage({
                appId: 'invalid',
                apiKey: process.env.TEST_API_KEY,
            });
            await expect(passage.getApp()).rejects.toThrow(PassageError);
        });
    });

    describe('createTransaction', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should return the transaction ID', async () => {
            const transactionId = await passage.createTransaction({
                externalId: 'test',
                passkeyDisplayName: 'test',
            });
            expect(transactionId).toEqual(expect.any(String));
        });
    });

    describe('verifyNonce', () => {
        let passage: Passage;

        beforeEach(() => {
            passage = new Passage({
                appId: expectedAppId,
                apiKey: process.env.TEST_API_KEY,
            });
        });

        it('should throw an error if the nonce is invalid', async () => {
            await expect(passage.verifyNonce('invalid')).rejects.toThrow(PassageError);
        });
    });
});
