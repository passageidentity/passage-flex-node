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


/**
 * 
 * @export
 */
export const UserStatus = {
    Active: 'active',
    Inactive: 'inactive',
    Pending: 'pending'
} as const;
export type UserStatus = typeof UserStatus[keyof typeof UserStatus];


export function instanceOfUserStatus(value: any): boolean {
    for (const key in UserStatus) {
        if (Object.prototype.hasOwnProperty.call(UserStatus, key)) {
            if (UserStatus[key as keyof typeof UserStatus] === value) {
                return true;
            }
        }
    }
    return false;
}

export function UserStatusFromJSON(json: any): UserStatus {
    return UserStatusFromJSONTyped(json, false);
}

export function UserStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserStatus {
    return json as UserStatus;
}

export function UserStatusToJSON(value?: UserStatus | null): any {
    return value as any;
}

export function UserStatusToJSONTyped(value: any, ignoreDiscriminator: boolean): UserStatus {
    return value as UserStatus;
}

