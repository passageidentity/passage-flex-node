export type RegisterTransactionArgs = {
    /**
     * the user's unique identifier
     */
    externalId: string;
    /**
     * the immutable display name of the passkey that the user will see
     */
    passkeyDisplayName: string;
};
