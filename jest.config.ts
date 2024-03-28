import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    transform: {
        '^.+\\.(t|j)s$': [
            'ts-jest',
            {
                isolatedModules: true,
            },
        ],
    },
};

export default config;
