<img src="https://storage.googleapis.com/passage-docs/passage-logo-gradient.svg" alt="Passage logo" style="width:250px;"/>

[![npm version](https://badge.fury.io/js/@passageidentity%2Fpassage-flex-node.svg)](https://badge.fury.io/js/@passageidentity%2Fpassage-flex-node)

# passage-flex-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage Passkey Flex](https://passage.id).

Install this package using npm.

```
npm i @passageidentity/passage-flex-node
```

## Create a Passage object

You will need to use a Passage AppID and API key. The API key can be created in the Passage Console under your Application Settings. This API key grants your web server access to the Passage management APIs to get and update information about users. This API key must be protected and stored in an appropriate secure storage location. It should never be hard-coded in the repository.

```javascript
import { Passage, PassageConfig } from '@passageidentity/passage-flex-node';

const passageConfig: PassageConfig = {
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
};

try {
    const passage = new Passage(passageConfig);
} catch (err) {
    // this will throw a PassageError if the appId or apiKey are empty
}
```

## Retrieve app info

To retrieve information about an app, you should use the `passage.getApp()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';

const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

const passageApp = await passage.getApp();
console.log(passageApp.authOrigin)
```

## Create a transaction

To create a transaction to kick off a user passkey registration or authentication, you should use the `passage.createTransaction()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';

const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

const transaction = await passage.createTransaction({
    externalId: 'a unique immutable string that represents your user',
    passkeyDisplayName: "the label for the user's passkey that they will see when logging in",
});
```

## Verify a nonce

To verify a nonce that you received from the end of of passkey registration or authentication ceremony, you should use the `passage.verifyNonce()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';

const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

try {
    await passage.verifyNonce('nonce');

    // do things like generate and send your own auth token
} catch (err) {
    // nonce was invalid or unable to be verified
}
```

## Retrieve user info

To retrieve information about a user by their external ID -- which is the unique, immutable ID you supply to associate the Passage user with your user -- you should use the `passage.user.getUser()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';
import express from 'express';

const app = express();
const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

// example authenticated route
app.get('/authenticatedRoute', authMiddleware, async (req, res) => {
    // this should be the same value you used when creating the transaction
    const externalId = yourUser.id;

    // get user info
    const passageUser = await passage.users.getUser(externalId);
    console.log(passageUser.webauthnDevices);
});
```

## Retrieve a user's passkey devices

To retrieve information about a user's passkey devices you should use the `passage.user.getDevices()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';

const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

// this should be the same value you used when creating the transaction
const externalId = yourUser.id;

// get devices
const passkeyDevices = await passage.users.getDevices(externalId);
for (const device of passkeyDevices) {
    console.log(device.usageCount);
}
```

## Revoke a user's passkey device

To revoke a user's passkey device you should use the `passage.user.revokeDevice()` function.

```javascript
import { Passage } from '@passageidentity/passage-flex-node';

const passage = new Passage({
    appId: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
});

// this should be the same value you used when creating the transaction
const externalId = yourUser.id;
const lastYear = new Date();
lastYear.setFullYear(lastYear.getFullYear() - 1);

// get devices
const passkeyDevices = await passage.users.getDevices(externalId);

for (const device of passkeyDevices) {
    // revoke old devices that haven't been used
    if (device.usageCount == 0 && device.lastLoginAt < lastYear) {
        try {
            await passage.users.revokeDevice(externalId, device.id);
        } catch (err) {
            // device couldn't be revoked
        }
    }
}
```
