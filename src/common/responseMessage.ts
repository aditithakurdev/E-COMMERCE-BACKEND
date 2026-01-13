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
  PRODUCT: {
    CREATE_SUCCESS: 'Product created successfully',
    CREATE_FAILED: 'Failed to create product',
    FETCH_ALL_SUCCESS: 'Products fetched successfully',
    FETCH_ONE_SUCCESS: 'Product fetched successfully',
    UPDATE_SUCCESS: 'Product updated successfully',
    UPDATE_FAILED: 'Failed to update product',
    DELETE_SUCCESS: 'Product deleted successfully',
    DELETE_FAILED: 'Failed to delete product',
    NOT_FOUND: 'Product not found',
    UNAUTHORIZED: 'You are not authorized to perform this action',
  },
  COMMON: {
    INVALID_INPUT: 'Invalid input data',
    SERVER_ERROR: 'Internal server error',
    EMAIL_ALREADY_EXISTS: 'Email is already registered',
  },

  ORDER: {
  CREATE_SUCCESS: 'Order created successfully',
  CREATE_FAILED: 'Failed to create order',
  FETCH_ALL_SUCCESS: 'Orders fetched successfully',
  FETCH_ONE_SUCCESS: 'Order fetched successfully',
  NOT_FOUND: 'Order not found',
  UNAUTHORIZED: 'You are not authorized to perform this action',
}

};
