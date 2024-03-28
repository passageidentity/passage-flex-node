import Passage from '../src/index';
import { PassageError } from '../src/classes/PassageError';

require('dotenv').config();

describe('Passage', () => {
    describe('constructor', () => {
        it.each(['', undefined, null])('should throw an error if appID is %s', (appID) => {
            expect(() => {
                new Passage({ appID });
            }).toThrow(PassageError);
        });
    });

    describe('getApp', () => {
        const expectedAppID = process.env.TEST_APP_ID;
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
    });
});
