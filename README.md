<img src="https://storage.googleapis.com/passage-docs/passage-logo-gradient.svg" alt="Passage logo" style="width:250px;"/>

[![npm version](https://badge.fury.io/js/@passageidentity%2Fpassage-flex-node.svg)](https://badge.fury.io/js/@passageidentity%2Fpassage-flex-node)

# passage-flex-node

This Node.js SDK allows for verification of server-side authentication for applications using [Passage Passkey Flex](https://passage.id).

Install this package using npm.

```
npm i @passageidentity/passage-flex-node
```

## Retrieve App Info

To retrieve information about an app, you should use the `passage.getApp()` function.

```javascript
import Passage from '@passageidentity/passage-flex-node';

const passageConfig = {
    appID: 'YOUR_APP_ID',
};

const passage = new Passage(passageConfig);
const passageApp = await passage.getApp();
```

## Create a transaction

To create a transaction to kick off a user passkey registration or authentication, you should use the `passage.createTransaction()` function.

```javascript
import Passage from '@passageidentity/passage-flex-node';

const passageConfig = {
    appID: 'YOUR_APP_ID',
};

const passage = new Passage(passageConfig);
const transaction = await passage.createTransaction({
    externalId: 'a unique immutable string that represents your user',
    passkeyDisplayName: "the label for the user's passkey that they will see when logging in",
});
```

## Verify a nonce

To verify a nonce that you received from the end of of passkey registration or authentication ceremony, you should use the `passage.verifyNonce()` function.

```javascript
import Passage from '@passageidentity/passage-flex-node';

const passageConfig = {
    appID: 'YOUR_APP_ID',
};

try {
    const passage = new Passage(passageConfig);
    const isValid = await passage.verifyNonce('nonce');

    // do things like generate and send your own auth token
} catch (err) {
    // nonce was invalid or unable to be verified
}
```

## Retrieve User Info

To retrieve information about a user, you should use the `passage.user.get()` function. You will need to use a Passage API key, which can be created in the Passage Console under your Application Settings. This API key grants your web server access to the Passage management APIs to get and update information about users. This API key must be protected and stored in an appropriate secure storage location. It should never be hard-coded in the repository.

```javascript
import Passage from '@passageidentity/passage-flex-node';
import express from 'express';

const app = express();
const port = 3000;

const passageConfig = {
    appID: 'YOUR_APP_ID',
    apiKey: 'YOUR_API_KEY',
};
const passage = new Passage(passageConfig);

// example authenticated route
app.get('/authenticatedRoute', passageAuthMiddleware, async (req, res) => {
    // get passage user ID from middleware
    const userID = res.userID;

    // get user info
    const passageUser = await passage.user.get(userID);
    console.log(passageUser.email);
});
```
