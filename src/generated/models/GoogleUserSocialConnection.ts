/* tslint:disable */
/* eslint-disable */
/**
 * Passage Management API
 * Passage\'s management API to manage your Passage apps and users.
 *
 * The version of the OpenAPI document: 1
 * Contact: support@passage.id
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GoogleUserSocialConnection
 */
export interface GoogleUserSocialConnection {
    /**
     * The external ID of the Social Connection.
     * @type {string}
     * @memberof GoogleUserSocialConnection
     */
    providerId: string;
    /**
     * 
     * @type {Date}
     * @memberof GoogleUserSocialConnection
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof GoogleUserSocialConnection
     */
    lastLoginAt: Date;
    /**
     * The email of connected social user.
     * @type {string}
     * @memberof GoogleUserSocialConnection
     */
    providerIdentifier: string;
}

/**
 * Check if a given object implements the GoogleUserSocialConnection interface.
 */
export function instanceOfGoogleUserSocialConnection(value: object): value is GoogleUserSocialConnection {
    if (!('providerId' in value) || value['providerId'] === undefined) return false;
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('lastLoginAt' in value) || value['lastLoginAt'] === undefined) return false;
    if (!('providerIdentifier' in value) || value['providerIdentifier'] === undefined) return false;
    return true;
}

export function GoogleUserSocialConnectionFromJSON(json: any): GoogleUserSocialConnection {
    return GoogleUserSocialConnectionFromJSONTyped(json, false);
}

export function GoogleUserSocialConnectionFromJSONTyped(json: any, ignoreDiscriminator: boolean): GoogleUserSocialConnection {
    if (json == null) {
        return json;
    }
    return {
        
        'providerId': json['provider_id'],
        'createdAt': (new Date(json['created_at'])),
        'lastLoginAt': (new Date(json['last_login_at'])),
        'providerIdentifier': json['provider_identifier'],
    };
}

export function GoogleUserSocialConnectionToJSON(json: any): GoogleUserSocialConnection {
    return GoogleUserSocialConnectionToJSONTyped(json, false);
}

export function GoogleUserSocialConnectionToJSONTyped(value?: GoogleUserSocialConnection | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'provider_id': value['providerId'],
        'created_at': ((value['createdAt']).toISOString()),
        'last_login_at': ((value['lastLoginAt']).toISOString()),
        'provider_identifier': value['providerIdentifier'],
    };
}

