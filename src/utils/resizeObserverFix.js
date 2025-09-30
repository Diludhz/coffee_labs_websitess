// This file handles ResizeObserver errors to prevent console pollution

// Store the original handler
const originalErrorHandler = window.onerror;

// Override the global error handler
window.onerror = function (message, source, lineno, colno, error) {
  // Ignore ResizeObserver loop errors
  if (
    (typeof message === 'string' && message.includes('ResizeObserver')) ||
    (error?.message?.includes('ResizeObserver') === true) ||
    (error?.name === 'ResizeObserverError')
  ) {
    // Optionally, you can log this in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('ResizeObserver loop warning suppressed', { message, source, error });
    }
    return true; // Prevents the default error handler from running
  }

  // Call the original handler if it exists
  if (typeof originalErrorHandler === 'function') {
    return originalErrorHandler(message, source, lineno, colno, error);
  }

  // Let the default handler run
  return false;
};

// Also handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (event) {
  if (
    event.reason &&
    (event.reason.message?.includes('ResizeObserver') ||
     event.reason.name === 'ResizeObserverError')
  ) {
    event.preventDefault();
    if (process.env.NODE_ENV === 'development') {
      console.warn('ResizeObserver loop warning (from promise) suppressed', event.reason);
    }
  }
});

// Add a debounced ResizeObserver to prevent loop issues

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const originalResizeObserver = window.ResizeObserver;

// Only override if not already overridden
if (originalResizeObserver && !window.__RESIZE_OBSERVER_OVERRIDE__) {
  window.__RESIZE_OBSERVER_OVERRIDE__ = true;
  
  window.ResizeObserver = class ResizeObserver extends originalResizeObserver {
    constructor(callback) {
      const debouncedCallback = debounce(callback, 100);
      super(debouncedCallback);
    }
  };
  
  // Copy static properties if they exist
  Object.entries(originalResizeObserver).forEach(([key, value]) => {
    if (key !== 'prototype' && key !== 'name' && key !== 'length') {
      window.ResizeObserver[key] = value;
    }
  });
}
