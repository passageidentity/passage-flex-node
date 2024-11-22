import { PassageFlexConfig } from './types';
import { PassageInstanceConfig } from '../PassageBase';
import { apiConfiguration } from '../../utils/apiConfiguration';
import { Auth } from '../Auth';
import { User } from '../User';

/**
 * PassageFlex class used to get app info, create transactions, and verify nonces
 */
export class PassageFlex {
    public readonly auth: Auth;
    public readonly user: User;

    /**
     * Initialize a new PassageFlex instance
     * @param {PassageFlexConfig} config The default config for Passage initialization
     */
    public constructor(config: PassageFlexConfig) {
        if (!config.appId) {
            throw Error('A Passage app ID is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.');
        }

        if (!config.apiKey) {
            throw Error('A Passage API key is required. Please include {appId: YOUR_APP_ID, apiKey: YOUR_APP_ID}.');
        }

        const { appId, apiKey } = config;

        const instanceConfig: PassageInstanceConfig = {
            appId,
            apiConfiguration: apiConfiguration({
                accessToken: apiKey,
            }),
        };

        this.auth = new Auth(instanceConfig);
        this.user = new User(instanceConfig);
    }
}
