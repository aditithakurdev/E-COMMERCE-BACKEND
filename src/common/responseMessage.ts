export const ResponseMessage = {
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully',
    REGISTER_FAILED: 'Registration failed',
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Invalid email or password',
    REFRESH_SUCCESS: 'Access token refreshed successfully',
    REFRESH_FAILED: 'Invalid or expired refresh token',
    LOGOUT_SUCCESS: 'Logout successful',
    UNAUTHORIZED: 'Unauthorized access',
  },
  USER: {
    PROFILE_FETCHED: 'User profile fetched successfully',
    USER_NOT_FOUND: 'User not found',
    UPDATE_SUCCESS: 'User updated successfully',
    UPDATE_FAILED: 'Failed to update user',
    DELETE_SUCCESS: 'User deleted successfully',
    DELETE_FAILED: 'Failed to delete user',
  },
  COMMON: {
    INVALID_INPUT: 'Invalid input data',
    SERVER_ERROR: 'Internal server error',
    EMAIL_ALREADY_EXISTS: 'Email is already registered',
  },
};
