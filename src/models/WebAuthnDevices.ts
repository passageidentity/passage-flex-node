import { WebAuthnIcons, WebAuthnType } from '../generated/models';

export interface WebAuthnDevices {
    createdAt: Date;
    credId: string;
    friendlyName: string;
    id: string;
    lastLoginAt: Date;
    type: WebAuthnType;
    updatedAt: Date;
    usageCount: number;
    icons: WebAuthnIcons;
}
