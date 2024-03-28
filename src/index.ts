import Users from './classes/Passage';
export * from './types/PassageConfig';
export { ResponseError } from './generated';

// override the exported models from ./generated/models
export * from './models';

// @ts-ignore ignore the export override
export * from './generated/models';

module.exports = Users;

export default Users;
