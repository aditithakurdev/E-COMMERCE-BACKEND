export enum ErrorMessage {
  // Auth errors
  UNAUTHORIZED = 'Unauthorized access',
  LOGIN_FAILED = 'Invalid email or password',
  REGISTER_FAILED = 'Registration failed',
  REFRESH_FAILED = 'Invalid or expired refresh token',
  EMAIL_ALREADY_EXISTS = 'Email is already registered',

  // User errors
  USER_NOT_FOUND = 'User not found',
  UPDATE_USER_FAILED = 'Failed to update user',
  DELETE_USER_FAILED = 'Failed to delete user',

  // Product errors
  PRODUCT_NOT_FOUND = 'Product not found',
  CREATE_PRODUCT_FAILED = 'Failed to create product',
  UPDATE_PRODUCT_FAILED = 'Failed to update product',
  DELETE_PRODUCT_FAILED = 'Failed to delete product',
  PRODUCT_UNAUTHORIZED = 'You are not authorized to perform this action',

  // Order errors
  ORDER_NOT_FOUND = 'Order not found',
  CREATE_ORDER_FAILED = 'Failed to create order',
  ORDER_UNAUTHORIZED = 'You are not authorized to access this order',

  // Common
  INVALID_INPUT = 'Invalid input data',
  SERVER_ERROR = 'Internal server error',
}
