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


import * as runtime from '../runtime';
import type {
  ListPaginatedUsersResponse,
  Model400Error,
  Model401Error,
  Model404Error,
  Model500Error,
  UserResponse,
} from '../models/index';
import {
    ListPaginatedUsersResponseFromJSON,
    ListPaginatedUsersResponseToJSON,
    Model400ErrorFromJSON,
    Model400ErrorToJSON,
    Model401ErrorFromJSON,
    Model401ErrorToJSON,
    Model404ErrorFromJSON,
    Model404ErrorToJSON,
    Model500ErrorFromJSON,
    Model500ErrorToJSON,
    UserResponseFromJSON,
    UserResponseToJSON,
} from '../models/index';

export interface GetUserRequest {
    appId: string;
    userId: string;
}

export interface ListPaginatedUsersRequest {
    appId: string;
    page?: number;
    limit?: number;
    createdBefore?: number;
    orderBy?: string;
    identifier?: string;
    id?: string;
    loginCount?: number;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    lastLoginAt?: string;
}

/**
 * 
 */
export class UsersApi extends runtime.BaseAPI {

    /**
     * Get information about a user.
     * Get User
     */
    async getUserRaw(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
        if (requestParameters['appId'] == null) {
            throw new runtime.RequiredError(
                'appId',
                'Required parameter "appId" was null or undefined when calling getUser().'
            );
        }

        if (requestParameters['userId'] == null) {
            throw new runtime.RequiredError(
                'userId',
                'Required parameter "userId" was null or undefined when calling getUser().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users/{user_id}`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters['appId']))).replace(`{${"user_id"}}`, encodeURIComponent(String(requestParameters['userId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
    }

    /**
     * Get information about a user.
     * Get User
     */
    async getUser(requestParameters: GetUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
        const response = await this.getUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * List users for an app.
     * List Users
     */
    async listPaginatedUsersRaw(requestParameters: ListPaginatedUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<ListPaginatedUsersResponse>> {
        if (requestParameters['appId'] == null) {
            throw new runtime.RequiredError(
                'appId',
                'Required parameter "appId" was null or undefined when calling listPaginatedUsers().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['page'] != null) {
            queryParameters['page'] = requestParameters['page'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        if (requestParameters['createdBefore'] != null) {
            queryParameters['created_before'] = requestParameters['createdBefore'];
        }

        if (requestParameters['orderBy'] != null) {
            queryParameters['order_by'] = requestParameters['orderBy'];
        }

        if (requestParameters['identifier'] != null) {
            queryParameters['identifier'] = requestParameters['identifier'];
        }

        if (requestParameters['id'] != null) {
            queryParameters['id'] = requestParameters['id'];
        }

        if (requestParameters['loginCount'] != null) {
            queryParameters['login_count'] = requestParameters['loginCount'];
        }

        if (requestParameters['status'] != null) {
            queryParameters['status'] = requestParameters['status'];
        }

        if (requestParameters['createdAt'] != null) {
            queryParameters['created_at'] = requestParameters['createdAt'];
        }

        if (requestParameters['updatedAt'] != null) {
            queryParameters['updated_at'] = requestParameters['updatedAt'];
        }

        if (requestParameters['lastLoginAt'] != null) {
            queryParameters['last_login_at'] = requestParameters['lastLoginAt'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/apps/{app_id}/users`.replace(`{${"app_id"}}`, encodeURIComponent(String(requestParameters['appId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ListPaginatedUsersResponseFromJSON(jsonValue));
    }

    /**
     * List users for an app.
     * List Users
     */
    async listPaginatedUsers(requestParameters: ListPaginatedUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<ListPaginatedUsersResponse> {
        const response = await this.listPaginatedUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
