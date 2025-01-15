import { PassageFlex } from './PassageFlex';
import { Auth } from '../Auth';
import { User } from '../User';
import { PassageFlexConfig } from './types';

describe('PassageFlex', () => {
    describe('constructor', () => {
        it('should create a new PassageFlex instance with valid config', () => {
            const config = {
                appId: 'test-app-id',
                apiKey: 'test-api-key',
            };

            const passageFlex = new PassageFlex(config);

            expect(passageFlex).toBeInstanceOf(PassageFlex);
            expect(passageFlex.auth).toBeInstanceOf(Auth);
            expect(passageFlex.user).toBeInstanceOf(User);
        });

        it('should throw error when appId is missing', () => {
            const config = {
                apiKey: 'test-api-key',
            } as unknown as PassageFlexConfig;

            expect(() => new PassageFlex(config)).toThrow(
                'A Passage App ID is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        });

        it('should throw error when appId is empty string', () => {
            const config = {
                appId: '',
                apiKey: 'test-api-key',
            };

            expect(() => new PassageFlex(config)).toThrow(
                'A Passage App ID is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        });

        it('should throw error when apiKey is missing', () => {
            const config = {
                appId: 'test-app-id',
            } as unknown as PassageFlexConfig;

            expect(() => new PassageFlex(config)).toThrow(
                'A Passage API key is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        });

        it('should throw error when apiKey is empty string', () => {
            const config = {
                appId: 'test-app-id',
                apiKey: '',
            };

            expect(() => new PassageFlex(config)).toThrow(
                'A Passage API key is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.',
            );
        });
    });
});
