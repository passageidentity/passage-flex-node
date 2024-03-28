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
import type { TtlDisplayUnit } from './TtlDisplayUnit';
import {
    TtlDisplayUnitFromJSON,
    TtlDisplayUnitFromJSONTyped,
    TtlDisplayUnitToJSON,
} from './TtlDisplayUnit';

/**
 * 
 * @export
 * @interface MagicLinkAuthMethod
 */
export interface MagicLinkAuthMethod {
    /**
     * 
     * @type {boolean}
     * @memberof MagicLinkAuthMethod
     */
    enabled: boolean;
    /**
     * Maximum time (IN SECONDS) for the auth to expire.
     * @type {number}
     * @memberof MagicLinkAuthMethod
     */
    ttl: number;
    /**
     * 
     * @type {TtlDisplayUnit}
     * @memberof MagicLinkAuthMethod
     * @deprecated
     */
    ttlDisplayUnit: TtlDisplayUnit;
}

/**
 * Check if a given object implements the MagicLinkAuthMethod interface.
 */
export function instanceOfMagicLinkAuthMethod(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "enabled" in value;
    isInstance = isInstance && "ttl" in value;
    isInstance = isInstance && "ttlDisplayUnit" in value;

    return isInstance;
}

export function MagicLinkAuthMethodFromJSON(json: any): MagicLinkAuthMethod {
    return MagicLinkAuthMethodFromJSONTyped(json, false);
}

export function MagicLinkAuthMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLinkAuthMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'enabled': json['enabled'],
        'ttl': json['ttl'],
        'ttlDisplayUnit': TtlDisplayUnitFromJSON(json['ttl_display_unit']),
    };
}

export function MagicLinkAuthMethodToJSON(value?: MagicLinkAuthMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'enabled': value.enabled,
        'ttl': value.ttl,
        'ttl_display_unit': TtlDisplayUnitToJSON(value.ttlDisplayUnit),
    };
}

