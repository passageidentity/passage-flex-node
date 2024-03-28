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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateTransactionRequest
 */
export interface CreateTransactionRequest {
    /**
     * the user's unique identifier that will be associated with this transaction
     * @type {string}
     * @memberof CreateTransactionRequest
     */
    external_id: string;
    /**
     * the immutable display name of the passkey that the user will see
     * @type {string}
     * @memberof CreateTransactionRequest
     */
    passkey_display_name: string;
}

/**
 * Check if a given object implements the CreateTransactionRequest interface.
 */
export function instanceOfCreateTransactionRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "external_id" in value;
    isInstance = isInstance && "passkey_display_name" in value;

    return isInstance;
}

export function CreateTransactionRequestFromJSON(json: any): CreateTransactionRequest {
    return CreateTransactionRequestFromJSONTyped(json, false);
}

export function CreateTransactionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTransactionRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'external_id': json['external_id'],
        'passkey_display_name': json['passkey_display_name'],
    };
}

export function CreateTransactionRequestToJSON(value?: CreateTransactionRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'external_id': value.external_id,
        'passkey_display_name': value.passkey_display_name,
    };
}

