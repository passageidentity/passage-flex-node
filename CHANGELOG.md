# Change Log - @passageidentity/passage-flex-node

This log was last generated on Thu, 24 Oct 2024 15:40:33 GMT and should not be manually modified.

<!-- Start content -->

## [1.0.0](https://github.com/passageidentity/passage-flex-node/compare/passage-flex-node-v0.2.5...passage-flex-node-v1.0.0) (2024-12-18)


### ⚠ BREAKING CHANGES

* Reorganize API with new class structure and improved error handling ([#66](https://github.com/passageidentity/passage-flex-node/issues/66))

### Features

* add externalId prop to PassageUser type ([#76](https://github.com/passageidentity/passage-flex-node/issues/76)) ([6db397a](https://github.com/passageidentity/passage-flex-node/commit/6db397ae556f15f6784ab9f4ece9dc9285e6e4ac))
* Reorganize API with new class structure and improved error handling ([#66](https://github.com/passageidentity/passage-flex-node/issues/66)) ([7f1aa55](https://github.com/passageidentity/passage-flex-node/commit/7f1aa55f8049f3c4fcf1ad8ca39136caa10aa9ad))
* split createTransaction for register and authenticate ([#11](https://github.com/passageidentity/passage-flex-node/issues/11)) ([952fd8c](https://github.com/passageidentity/passage-flex-node/commit/952fd8c75730a92049653bfcf3aa3065c7fccadb))
* updates user.get rejected error type and message ([#71](https://github.com/passageidentity/passage-flex-node/issues/71)) ([bae9587](https://github.com/passageidentity/passage-flex-node/commit/bae95876c7ae36530aee6e152bc2dda34527df97))


### Bug Fixes

* PSG-4576 fix missing authorization header ([#32](https://github.com/passageidentity/passage-flex-node/issues/32)) ([1ba6ac9](https://github.com/passageidentity/passage-flex-node/commit/1ba6ac9c4c5031ce3d6e0d340675bb5ce29af769))
* PSG-4604 fix passage header ([#36](https://github.com/passageidentity/passage-flex-node/issues/36)) ([2bda381](https://github.com/passageidentity/passage-flex-node/commit/2bda381cd27d0d9c751eb9f8ce6a5fd80b5f46df))
* removes deprecated command in deploy workflow ([#5](https://github.com/passageidentity/passage-flex-node/issues/5)) ([344cfe1](https://github.com/passageidentity/passage-flex-node/commit/344cfe1ff1d019a7c0736f6af96760301ba45c95))

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
