// This file handles ResizeObserver errors to prevent console pollution

// Store the original handler
const originalErrorHandler = window.onerror;

// Override the global error handler
window.onerror = function (message, source, lineno, colno, error) {
  // Ignore ResizeObserver loop errors
  if (
    typeof message === 'string' &&
    message.includes('ResizeObserver loop') ||
    (error && error.message && error.message.includes('ResizeObserver'))
  ) {
    // Optionally, you can log this in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('ResizeObserver loop warning suppressed');
    }
    return true; // Prevents the default error handler from running
  }

  // For all other errors, call the original error handler if it exists
  if (typeof originalErrorHandler === 'function') {
    return originalErrorHandler(message, source, lineno, colno, error);
  }

  // Let the default handler run
  return false;
};

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason &&
    typeof event.reason.message === 'string' &&
    event.reason.message.includes('ResizeObserver')
  ) {
    event.preventDefault();
    if (process.env.NODE_ENV === 'development') {
      console.warn('ResizeObserver loop warning (from promise) suppressed');
    }
  }
});
