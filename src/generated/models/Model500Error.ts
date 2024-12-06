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
 * @interface Model500Error
 */
export interface Model500Error {
    /**
     * 
     * @type {string}
     * @memberof Model500Error
     */
    code: Model500ErrorCodeEnum;
    /**
     * 
     * @type {string}
     * @memberof Model500Error
     */
    error: string;
}


/**
 * @export
 */
export const Model500ErrorCodeEnum = {
    InternalServerError: 'internal_server_error'
} as const;
export type Model500ErrorCodeEnum = typeof Model500ErrorCodeEnum[keyof typeof Model500ErrorCodeEnum];


/**
 * Check if a given object implements the Model500Error interface.
 */
export function instanceOfModel500Error(value: object): value is Model500Error {
    if (!('code' in value) || value['code'] === undefined) return false;
    if (!('error' in value) || value['error'] === undefined) return false;
    return true;
}

export function Model500ErrorFromJSON(json: any): Model500Error {
    return Model500ErrorFromJSONTyped(json, false);
}

export function Model500ErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): Model500Error {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'],
        'error': json['error'],
    };
}

export function Model500ErrorToJSON(json: any): Model500Error {
    return Model500ErrorToJSONTyped(json, false);
}

export function Model500ErrorToJSONTyped(value?: Model500Error | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'code': value['code'],
        'error': value['error'],
    };
}

