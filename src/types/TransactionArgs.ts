export type TransactionArgs = {
    /**
     * the user's unique identifier that will be associated with this transaction
     */
    externalId: string;
    /**
     * the immutable display name of the passkey that the user will see
     */
    passkeyDisplayName: string;
};
