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
import type { UserStatus } from './UserStatus';
import {
    UserStatusFromJSON,
    UserStatusFromJSONTyped,
    UserStatusToJSON,
} from './UserStatus';

/**
 * 
 * @export
 * @interface ListPaginatedUsersItem
 */
export interface ListPaginatedUsersItem {
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    createdAt: Date;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    email: string;
    /**
     * 
     * @type {boolean}
     * @memberof ListPaginatedUsersItem
     */
    emailVerified: boolean;
    /**
     * The external ID of the user. Only set if the user was created in a Flex app.
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    externalId: string;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    id: string;
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    lastLoginAt: Date;
    /**
     * 
     * @type {number}
     * @memberof ListPaginatedUsersItem
     */
    loginCount: number;
    /**
     * 
     * @type {string}
     * @memberof ListPaginatedUsersItem
     */
    phone: string;
    /**
     * 
     * @type {boolean}
     * @memberof ListPaginatedUsersItem
     */
    phoneVerified: boolean;
    /**
     * 
     * @type {UserStatus}
     * @memberof ListPaginatedUsersItem
     */
    status: UserStatus;
    /**
     * 
     * @type {Date}
     * @memberof ListPaginatedUsersItem
     */
    updatedAt: Date;
    /**
     * 
     * @type {object}
     * @memberof ListPaginatedUsersItem
     */
    userMetadata: object | null;
}

/**
 * Check if a given object implements the ListPaginatedUsersItem interface.
 */
export function instanceOfListPaginatedUsersItem(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "emailVerified" in value;
    isInstance = isInstance && "externalId" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "lastLoginAt" in value;
    isInstance = isInstance && "loginCount" in value;
    isInstance = isInstance && "phone" in value;
    isInstance = isInstance && "phoneVerified" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "userMetadata" in value;

    return isInstance;
}

export function ListPaginatedUsersItemFromJSON(json: any): ListPaginatedUsersItem {
    return ListPaginatedUsersItemFromJSONTyped(json, false);
}

export function ListPaginatedUsersItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListPaginatedUsersItem {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'email': json['email'],
        'emailVerified': json['email_verified'],
        'externalId': json['external_id'],
        'id': json['id'],
        'lastLoginAt': (new Date(json['last_login_at'])),
        'loginCount': json['login_count'],
        'phone': json['phone'],
        'phoneVerified': json['phone_verified'],
        'status': UserStatusFromJSON(json['status']),
        'updatedAt': (new Date(json['updated_at'])),
        'userMetadata': json['user_metadata'],
    };
}

export function ListPaginatedUsersItemToJSON(value?: ListPaginatedUsersItem | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': (value.createdAt.toISOString()),
        'email': value.email,
        'email_verified': value.emailVerified,
        'external_id': value.externalId,
        'id': value.id,
        'last_login_at': (value.lastLoginAt.toISOString()),
        'login_count': value.loginCount,
        'phone': value.phone,
        'phone_verified': value.phoneVerified,
        'status': UserStatusToJSON(value.status),
        'updated_at': (value.updatedAt.toISOString()),
        'user_metadata': value.userMetadata,
    };
}

