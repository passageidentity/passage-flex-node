import { PassageConfig } from '../types/PassageConfig';
import apiConfiguration from '../utils/apiConfiguration';

import { Configuration, UsersApi } from '../generated';

/***/
export default class User {
    private readonly appID: string;
    private readonly apiKey: string;
    private readonly client: UsersApi;
    private readonly configuration: Configuration;

    /**
     * Initialize a new Passage User instance.
     *
     * @param {PassageConfig} config The default config for Passage and User initialization
     */
    public constructor(config: PassageConfig) {
        this.appID = config.appID;
        this.apiKey = config.apiKey ?? '';

        this.configuration = apiConfiguration({
            accessToken: this.apiKey,
        });

        this.client = new UsersApi(this.configuration);
    }
}
