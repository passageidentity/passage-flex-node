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
 * @interface CreateTransactionAuthenticateRequest
 */
export interface CreateTransactionAuthenticateRequest {
    /**
     * the user's unique identifier that will be associated with this transaction
     * @type {string}
     * @memberof CreateTransactionAuthenticateRequest
     */
    externalId: string;
}

/**
 * Check if a given object implements the CreateTransactionAuthenticateRequest interface.
 */
export function instanceOfCreateTransactionAuthenticateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "externalId" in value;

    return isInstance;
}

export function CreateTransactionAuthenticateRequestFromJSON(json: any): CreateTransactionAuthenticateRequest {
    return CreateTransactionAuthenticateRequestFromJSONTyped(json, false);
}

export function CreateTransactionAuthenticateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTransactionAuthenticateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'externalId': json['external_id'],
    };
}

export function CreateTransactionAuthenticateRequestToJSON(value?: CreateTransactionAuthenticateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'external_id': value.externalId,
    };
}
