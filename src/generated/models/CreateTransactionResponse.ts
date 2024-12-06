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
 * @interface CreateTransactionResponse
 */
export interface CreateTransactionResponse {
    /**
     * the created transaction ID for this registration or authentication attempt
     * @type {string}
     * @memberof CreateTransactionResponse
     */
    transactionId: string;
}

/**
 * Check if a given object implements the CreateTransactionResponse interface.
 */
export function instanceOfCreateTransactionResponse(value: object): value is CreateTransactionResponse {
    if (!('transactionId' in value) || value['transactionId'] === undefined) return false;
    return true;
}

export function CreateTransactionResponseFromJSON(json: any): CreateTransactionResponse {
    return CreateTransactionResponseFromJSONTyped(json, false);
}

export function CreateTransactionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTransactionResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'transactionId': json['transaction_id'],
    };
}

export function CreateTransactionResponseToJSON(json: any): CreateTransactionResponse {
    return CreateTransactionResponseToJSONTyped(json, false);
}

export function CreateTransactionResponseToJSONTyped(value?: CreateTransactionResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'transaction_id': value['transactionId'],
    };
}

