import { User } from './User';
import { UsersApi, UserInfo } from '../../generated';
import { apiConfiguration } from '../../utils/apiConfiguration';

// Mock the generated APIs
jest.mock('../../generated');

describe('User', () => {
    let user: User;
    const mockConfig = {
        appId: 'test-app-id',
        apiConfiguration: apiConfiguration(),
    };

    const mockUserInfo: Partial<UserInfo> = {
        id: 'user-123',
        createdAt: new Date('2024-01-01'),
        lastLoginAt: new Date('2024-01-02'),
        loginCount: 5,
        status: 'active',
        updatedAt: new Date('2024-01-02'),
        userMetadata: {},
        webauthn: true,
        webauthnDevices: [],
        webauthnTypes: [],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        user = new User(mockConfig);
    });

    describe('get', () => {
        it('should successfully map user info', async () => {
            // Mock the API responses
            (UsersApi.prototype.listPaginatedUsers as jest.Mock).mockResolvedValue({
                users: [{ id: 'user-123' }],
            });
            (UsersApi.prototype.getUser as jest.Mock).mockResolvedValue({
                user: mockUserInfo,
            });

            const result = await user.get('external-123');

            // Verify result
            expect(result).toEqual({
                id: 'user-123',
                createdAt: new Date('2024-01-01'),
                lastLoginAt: new Date('2024-01-02'),
                loginCount: 5,
                status: 'active',
                updatedAt: new Date('2024-01-02'),
                userMetadata: {},
                webauthn: true,
                webauthnDevices: [],
                webauthnTypes: [],
            });
        });

        it('should throw error when user is not found', async () => {
            // Mock empty user list response
            (UsersApi.prototype.listPaginatedUsers as jest.Mock).mockResolvedValue({
                users: [],
            });

            await expect(user.get('non-existent-id')).rejects.toThrow(
                'Could not find user with that external ID'
            );
        });

    });
});
