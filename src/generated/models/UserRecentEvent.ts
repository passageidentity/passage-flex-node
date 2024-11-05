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
import type { SocialConnectionType } from './SocialConnectionType';
import {
    SocialConnectionTypeFromJSON,
    SocialConnectionTypeFromJSONTyped,
    SocialConnectionTypeToJSON,
} from './SocialConnectionType';
import type { UserEventAction } from './UserEventAction';
import {
    UserEventActionFromJSON,
    UserEventActionFromJSONTyped,
    UserEventActionToJSON,
} from './UserEventAction';
import type { UserEventStatus } from './UserEventStatus';
import {
    UserEventStatusFromJSON,
    UserEventStatusFromJSONTyped,
    UserEventStatusToJSON,
} from './UserEventStatus';

/**
 * 
 * @export
 * @interface UserRecentEvent
 */
export interface UserRecentEvent {
    /**
     * 
     * @type {Date}
     * @memberof UserRecentEvent
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof UserRecentEvent
     */
    completedAt: Date | null;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    ipAddr: string;
    /**
     * 
     * @type {UserEventStatus}
     * @memberof UserRecentEvent
     */
    status: UserEventStatus;
    /**
     * 
     * @type {string}
     * @memberof UserRecentEvent
     */
    type: string;
    /**
     * The raw user agent value from the originating device
     * @type {string}
     * @memberof UserRecentEvent
     */
    userAgent: string;
    /**
     * A display-friendly version of the user agent
     * @type {string}
     * @memberof UserRecentEvent
     */
    userAgentDisplay: string;
    /**
     * 
     * @type {UserEventAction}
     * @memberof UserRecentEvent
     */
    action: UserEventAction;
    /**
     * 
     * @type {SocialConnectionType}
     * @memberof UserRecentEvent
     */
    socialLoginType: SocialConnectionType | null;
}

/**
 * Check if a given object implements the UserRecentEvent interface.
 */
export function instanceOfUserRecentEvent(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "completedAt" in value;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "ipAddr" in value;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "userAgent" in value;
    isInstance = isInstance && "userAgentDisplay" in value;
    isInstance = isInstance && "action" in value;
    isInstance = isInstance && "socialLoginType" in value;

    return isInstance;
}

export function UserRecentEventFromJSON(json: any): UserRecentEvent {
    return UserRecentEventFromJSONTyped(json, false);
}

export function UserRecentEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserRecentEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'createdAt': (new Date(json['created_at'])),
        'completedAt': (json['completed_at'] === null ? null : new Date(json['completed_at'])),
        'id': json['id'],
        'ipAddr': json['ip_addr'],
        'status': UserEventStatusFromJSON(json['status']),
        'type': json['type'],
        'userAgent': json['user_agent'],
        'userAgentDisplay': json['user_agent_display'],
        'action': UserEventActionFromJSON(json['action']),
        'socialLoginType': SocialConnectionTypeFromJSON(json['social_login_type']),
    };
}

export function UserRecentEventToJSON(value?: UserRecentEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'created_at': (value.createdAt.toISOString()),
        'completed_at': (value.completedAt === null ? null : value.completedAt.toISOString()),
        'id': value.id,
        'ip_addr': value.ipAddr,
        'status': UserEventStatusToJSON(value.status),
        'type': value.type,
        'user_agent': value.userAgent,
        'user_agent_display': value.userAgentDisplay,
        'action': UserEventActionToJSON(value.action),
        'social_login_type': SocialConnectionTypeToJSON(value.socialLoginType),
    };
}

