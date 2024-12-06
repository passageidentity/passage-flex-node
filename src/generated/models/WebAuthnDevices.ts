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
import type { WebAuthnIcons } from './WebAuthnIcons';
import {
    WebAuthnIconsFromJSON,
    WebAuthnIconsFromJSONTyped,
    WebAuthnIconsToJSON,
    WebAuthnIconsToJSONTyped,
} from './WebAuthnIcons';
import type { WebAuthnType } from './WebAuthnType';
import {
    WebAuthnTypeFromJSON,
    WebAuthnTypeFromJSONTyped,
    WebAuthnTypeToJSON,
    WebAuthnTypeToJSONTyped,
} from './WebAuthnType';

/**
 * 
 * @export
 * @interface WebAuthnDevices
 */
export interface WebAuthnDevices {
    /**
     * The first time this webAuthn device was used to authenticate the user
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    createdAt: Date;
    /**
     * The CredID for this webAuthn device
     * @type {string}
     * @memberof WebAuthnDevices
     */
    credId: string;
    /**
     * The friendly name for the webAuthn device used to authenticate
     * @type {string}
     * @memberof WebAuthnDevices
     */
    friendlyName: string;
    /**
     * The ID of the webAuthn device used for authentication
     * @type {string}
     * @memberof WebAuthnDevices
     */
    id: string;
    /**
     * The last time this webAuthn device was used to authenticate the user
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    lastLoginAt: Date;
    /**
     * 
     * @type {WebAuthnType}
     * @memberof WebAuthnDevices
     */
    type: WebAuthnType;
    /**
     * The last time this webAuthn device was updated
     * @type {Date}
     * @memberof WebAuthnDevices
     */
    updatedAt: Date;
    /**
     * How many times this webAuthn device has been used to authenticate the user
     * @type {number}
     * @memberof WebAuthnDevices
     */
    usageCount: number;
    /**
     * 
     * @type {WebAuthnIcons}
     * @memberof WebAuthnDevices
     */
    icons: WebAuthnIcons;
}



/**
 * Check if a given object implements the WebAuthnDevices interface.
 */
export function instanceOfWebAuthnDevices(value: object): value is WebAuthnDevices {
    if (!('createdAt' in value) || value['createdAt'] === undefined) return false;
    if (!('credId' in value) || value['credId'] === undefined) return false;
    if (!('friendlyName' in value) || value['friendlyName'] === undefined) return false;
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('lastLoginAt' in value) || value['lastLoginAt'] === undefined) return false;
    if (!('type' in value) || value['type'] === undefined) return false;
    if (!('updatedAt' in value) || value['updatedAt'] === undefined) return false;
    if (!('usageCount' in value) || value['usageCount'] === undefined) return false;
    if (!('icons' in value) || value['icons'] === undefined) return false;
    return true;
}

export function WebAuthnDevicesFromJSON(json: any): WebAuthnDevices {
    return WebAuthnDevicesFromJSONTyped(json, false);
}

export function WebAuthnDevicesFromJSONTyped(json: any, ignoreDiscriminator: boolean): WebAuthnDevices {
    if (json == null) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'credId': json['cred_id'],
        'friendlyName': json['friendly_name'],
        'id': json['id'],
        'lastLoginAt': (new Date(json['last_login_at'])),
        'type': WebAuthnTypeFromJSON(json['type']),
        'updatedAt': (new Date(json['updated_at'])),
        'usageCount': json['usage_count'],
        'icons': WebAuthnIconsFromJSON(json['icons']),
    };
}

export function WebAuthnDevicesToJSON(json: any): WebAuthnDevices {
    return WebAuthnDevicesToJSONTyped(json, false);
}

export function WebAuthnDevicesToJSONTyped(value?: WebAuthnDevices | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'created_at': ((value['createdAt']).toISOString()),
        'cred_id': value['credId'],
        'friendly_name': value['friendlyName'],
        'id': value['id'],
        'last_login_at': ((value['lastLoginAt']).toISOString()),
        'type': WebAuthnTypeToJSON(value['type']),
        'updated_at': ((value['updatedAt']).toISOString()),
        'usage_count': value['usageCount'],
        'icons': WebAuthnIconsToJSON(value['icons']),
    };
}

