import { Configuration, ConfigurationParameters } from '../generated';

/**
 * Initialize defaults for Configuration
 *
 * @param {ConfigurationParameters} config options for Configuration.
 * @return {Configuration} Configuration object
 */
export function apiConfiguration(config?: ConfigurationParameters): Configuration {
    const configuration = new Configuration({
        accessToken: config?.accessToken,
        fetchApi: config?.fetchApi,
        headers: {
            ...config?.headers,
            'Authorization': `Bearer ${config?.accessToken}`,
            'Passage-Version': `passage-flex-node ${process.env.npm_package_version ?? ''}`,
        },
        middleware: [],
    });

    return configuration;
}
