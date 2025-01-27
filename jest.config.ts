import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};

export default config;
