import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    setupFiles: ['dotenv/config'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
};

export default config;
