![passage-flex-node](https://storage.googleapis.com/passage-docs/github-md-assets/passage-flex-node.png)

![NPM Version](https://img.shields.io/npm/v/%40passageidentity%2Fpassage-flex-node?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40passageidentity%2Fpassage-flex-node) ![NPM Type Definitions](https://img.shields.io/npm/types/%40passageidentity%2Fpassage-flex-node) [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#) ![GitHub License](https://img.shields.io/github/license/passageidentity/passage-flex-node)
![Static Badge](https://img.shields.io/badge/Built_by_1Password-grey?logo=1password)

## About

[Passage by 1Password](https://1password.com/product/passage) unlocks the passwordless future with a simpler, more secure passkey authentication experience. Passage handles the complexities of the [WebAuthn API](https://blog.1password.com/what-is-webauthn/), and allows you to implement passkeys with ease.

Use [Passkey Flex](https://docs.passage.id/flex) to add passkeys to an existing authentication experience.

Use [Passkey Complete](https://docs.passage.id/complete) as a standalone passwordless auth solution.

Use [Passkey Ready](https://docs.passage.id/passkey-ready) to determine if your users are ready for passkeys.

### In passage-flex-node

Use passage-flex-node to implement Passkey Flex into your Node.js backend to authenticate requests and manage users.

| Product                                                                                                                                  | Compatible                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![Passkey Flex](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-flex-icon.png) Passkey **Flex**             | ✅                                                                                                        |
| ![Passkey Complete](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-complete-icon.png) Passkey **Complete** | ✖️ For Passkey Complete, check out [passage-node](https://github.com/passageidentity/passage-node)        |
| ![Passkey Ready](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-ready-icon.png) Passkey **Ready**          | ✖️ For Passkey Ready, check out [Authentikit](https://www.npmjs.com/package/@passageidentity/authentikit) |

## Getting Started

### Check Prerequisites

<p>
 You'll need a free Passage account and a Passkey Flex app set up in <a href="https://console.passage.id/">Passage Console</a> to get started. <br />
 <sub><a href="https://docs.passage.id/home#passage-console">Learn more about Passage Console →</a></sub>
</p>

### Install

```shell
npm i @passageidentity/passage-flex-node
```

### Import

```js
import { PassageFlex, PassageConfig } from '@passageidentity/passage-flex-node';
```

### Initialize

```js
const passageConfig = {
    appID: process.env.YOUR_PASSAGE_APP_ID,
    apiKey: process.env.YOUR_PASSAGE_API_KEY,
};

let passage = new Passage(passageConfig);
```

### Go Passwordless

Find all core functions and more implementation guidance on our [Passkey Flex Node.js Documentation](https://docs.passage.id/flex/node) page.

## Support & Feedback

We are here to help! Find additional docs, the best ways to get in touch with our team, and more within our [support resources](https://github.com/passageidentity/.github/blob/main/SUPPORT.md).

<br />

---

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-light.png">
      <img alt="Passage by 1Password Logo" src="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-light.png">
    </picture>
</p>

<p align="center">
    <sub>Passage is a product by <a href="https://1password.com/product/passage">1Password</a>, the global leader in access management solutions with nearly 150k business customers.</sub><br />
    <sub>This project is licensed under the MIT license. See the <a href="LICENSE">LICENSE</a> file for more info.</sub>
</p>
