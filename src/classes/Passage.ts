import { PassageConfig } from '../types/PassageConfig';
import { PassageError } from './PassageError';
import { AppsApi, ResponseError } from '../generated';
import apiConfiguration from '../utils/apiConfiguration';
import { AppInfo } from '../models/AppInfo';

/**
 * Passage Class
 */
export default class Passage {
    public readonly apiKey?: string;
    public readonly appID: string;

    /**
     * Initialize a new Passage instance.
     * @param {PassageConfig} config The default config for Passage initialization
     */
    public constructor({ appID, apiKey }: PassageConfig) {
        if (!appID) {
            throw new PassageError('A Passage appID is required. Please include {appID: YOUR_APP_ID}.');
        }

        this.appID = appID;
        this.apiKey = apiKey;
    }

    /**
     * Get App Info about an app
     *
     * @return {Promise<AppInfo>} Passage App object
     */
    public async getApp(): Promise<AppInfo> {
        try {
            const configuration = apiConfiguration({
                accessToken: this.apiKey,
            });
            const client = new AppsApi(configuration);
            const response = await client.getApp({
                appId: this.appID,
            });

            const { id, name, auth_origin } = response.app;
            const appInfo: AppInfo = {
                id,
                name,
                authOrigin: auth_origin,
             };

            return appInfo;
        } catch (err) {
            throw new PassageError('Could not fetch app.', err as ResponseError);
        }
    }
}
