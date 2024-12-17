import { Configuration, ConfigurationParameters } from '../generated';
import fetch from 'node-fetch';

/**
 * Initialize defaults for Configuration
 *
 * @param {ConfigurationParameters} config options for Configuration.
 * @return {Configuration} Configuration object
 */
export function apiConfiguration(config?: ConfigurationParameters): Configuration {
    const configuration = new Configuration({
        accessToken: config?.accessToken,
        fetchApi: fetch as unknown as ConfigurationParameters['fetchApi'],
        headers: {
            ...config?.headers,
            'Passage-Version': `passage-flex-node ${process.env.npm_package_version ?? ''}`,
        },
        middleware: [],
    });

    return configuration;
}
