# Change Log - @passageidentity/passage-flex-node

This log was last generated on Thu, 24 Oct 2024 15:40:33 GMT and should not be manually modified.

<!-- Start content -->

## [1.0.1](https://github.com/passageidentity/passage-flex-node/compare/v1.0.0...v1.0.1) (2025-01-29)


### Bug Fixes

* remove references to old mjs files in package.json ([#89](https://github.com/passageidentity/passage-flex-node/issues/89)) ([a60d1d7](https://github.com/passageidentity/passage-flex-node/commit/a60d1d7d96a634da469b955660de89cf6f0bc5bb))

## [1.0.0](https://github.com/passageidentity/passage-flex-node/compare/v0.2.5...v1.0.0) (2025-01-16)


### ⚠ BREAKING CHANGES

* update auth.createRegisterTransaction and user.revokeDevice signatures to use two separate arguments ([#83](https://github.com/passageidentity/passage-flex-node/issues/83))
* remove deprecated AppInfo code from codegen ([#77](https://github.com/passageidentity/passage-flex-node/issues/77))
* Reorganize API with new class structure and improved error handling ([#66](https://github.com/passageidentity/passage-flex-node/issues/66))

### Features

* add externalId prop to PassageUser type ([#76](https://github.com/passageidentity/passage-flex-node/issues/76)) ([6db397a](https://github.com/passageidentity/passage-flex-node/commit/6db397ae556f15f6784ab9f4ece9dc9285e6e4ac))
* add parameter guards for all methods ([#84](https://github.com/passageidentity/passage-flex-node/issues/84)) ([7f6b79e](https://github.com/passageidentity/passage-flex-node/commit/7f6b79e9faa2075534528e14b41494f046a6f318))
* parameter guard ([#80](https://github.com/passageidentity/passage-flex-node/issues/80)) ([ad7239f](https://github.com/passageidentity/passage-flex-node/commit/ad7239fd63752998e17ef42278fc03207a94c7a6))
* remove deprecated AppInfo code from codegen ([#77](https://github.com/passageidentity/passage-flex-node/issues/77)) ([13f2cf9](https://github.com/passageidentity/passage-flex-node/commit/13f2cf9eb4e8e4f2d393a68f7673f0ba65c9749f))
* Reorganize API with new class structure and improved error handling ([#66](https://github.com/passageidentity/passage-flex-node/issues/66)) ([7f1aa55](https://github.com/passageidentity/passage-flex-node/commit/7f1aa55f8049f3c4fcf1ad8ca39136caa10aa9ad))
* update auth.createRegisterTransaction and user.revokeDevice signatures to use two separate arguments ([#83](https://github.com/passageidentity/passage-flex-node/issues/83)) ([fb6e173](https://github.com/passageidentity/passage-flex-node/commit/fb6e173056cceeffadd9b0c08ee7893ef3285aa8))
* updates user.get rejected error type and message ([#71](https://github.com/passageidentity/passage-flex-node/issues/71)) ([bae9587](https://github.com/passageidentity/passage-flex-node/commit/bae95876c7ae36530aee6e152bc2dda34527df97))

## 0.2.5

Thu, 24 Oct 2024 15:40:33 GMT

### Patches

- Update copy (jennifer.macfarlane@agilebits.com)

## 0.2.4

Thu, 24 Oct 2024 15:09:00 GMT

### Patches

- chore: fixes the name of the passage version header (chris.tran@agilebits.com)
- Chore(deps-dev): bump braces from 3.0.2 to 3.0.3 (chris.tran@agilebits.com)

## 0.2.3

Mon, 26 Aug 2024 18:43:54 GMT

### Patches

- fix: adds security scheme to authenticateVerify operation (chris.tran@agilebits.com)

## 0.2.2

Thu, 25 Apr 2024 17:01:51 GMT

### Patches

- fix: now passes the error info from the api response through to the PassageError object (chris.tran@agilebits.com)

## 0.2.1

Fri, 12 Apr 2024 16:57:01 GMT

### Patches

- fix node importing issues (kevin.flanagan@passage.id)

## 0.2.0

Fri, 12 Apr 2024 16:01:11 GMT

### Minor changes

- update verifyNonce to return user's externalId (bert.ramirez@agilebits.com)
- feat: splits createTransaction into two functions for register and authenticate (chris.tran@agilebits.com)
- refactor: renames the Passage class to PassageFlex (chris.tran@agilebits.com)

## 0.1.1

Fri, 29 Mar 2024 18:56:01 GMT

### Patches

- chore: set version (chris.tran@agilebits.com)

## 0.1.0

Fri, 29 Mar 2024 15:11:40 GMT

### Minor changes

- feat: adds User class (chris.tran@agilebits.com)
- feat: adds the Passage class (chris.tran@agilebits.com)
