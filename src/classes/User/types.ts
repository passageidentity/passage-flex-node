import { UserStatus, WebAuthnDevices, WebAuthnType } from '../../generated';

export interface PassageUser {
    createdAt: Date;
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
