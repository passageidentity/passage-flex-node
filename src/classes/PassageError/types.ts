import {
    Model400ErrorCodeEnum,
    Model401ErrorCodeEnum,
    Model403ErrorCodeEnum,
    Model404ErrorCodeEnum,
    Model409ErrorCodeEnum,
    Model500ErrorCodeEnum,
} from '../../generated';

export const PassageErrorCode = {
    ...Model400ErrorCodeEnum,
    ...Model401ErrorCodeEnum,
    ...Model403ErrorCodeEnum,
    ...Model404ErrorCodeEnum,
    ...Model409ErrorCodeEnum,
    ...Model500ErrorCodeEnum,
};

export type PassageErrorCode = (typeof PassageErrorCode)[keyof typeof PassageErrorCode];
