import { UserStatus, WebAuthnDevices, WebAuthnType, WebAuthnIcons } from '../../generated';

export interface PassageUser {
    createdAt: Date;
    externalId: string;
    id: string;
    lastLoginAt: Date;
    loginCount: number;
    status: UserStatus;
    updatedAt: Date;
    userMetadata: object | null;
    webauthn: boolean;
    webauthnDevices: WebAuthnDevices[];
    webauthnTypes: WebAuthnType[];
}

export { UserStatus, WebAuthnDevices, WebAuthnType, WebAuthnIcons };
