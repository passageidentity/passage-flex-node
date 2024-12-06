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
import type { UserInfo } from './UserInfo';
import {
    UserInfoFromJSON,
    UserInfoFromJSONTyped,
    UserInfoToJSON,
    UserInfoToJSONTyped,
} from './UserInfo';

/**
 * 
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
    /**
     * 
     * @type {UserInfo}
     * @memberof UserResponse
     */
    user: UserInfo;
}

/**
 * Check if a given object implements the UserResponse interface.
 */
export function instanceOfUserResponse(value: object): value is UserResponse {
    if (!('user' in value) || value['user'] === undefined) return false;
    return true;
}

export function UserResponseFromJSON(json: any): UserResponse {
    return UserResponseFromJSONTyped(json, false);
}

export function UserResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'user': UserInfoFromJSON(json['user']),
    };
}

export function UserResponseToJSON(json: any): UserResponse {
    return UserResponseToJSONTyped(json, false);
}

export function UserResponseToJSONTyped(value?: UserResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'user': UserInfoToJSON(value['user']),
    };
}

