/**
 * This file handles ResizeObserver errors to prevent console pollution
 * It combines error suppression with debouncing for optimal performance
 */

// Store the original error handler
const originalErrorHandler = window.onerror;

// Override the global error handler to catch ResizeObserver errors
window.onerror = function (message, source, lineno, colno, error) {
  // Ignore ResizeObserver loop errors
  if (
    (typeof message === 'string' && message.includes('ResizeObserver')) ||
    (error?.message?.includes?.('ResizeObserver')) ||
    (error?.name === 'ResizeObserverError')
  ) {
    return true; // Prevent default error handler
  }

  // Call the original handler if it exists
  if (typeof originalErrorHandler === 'function') {
    return originalErrorHandler(message, source, lineno, colno, error);
  }

  return false; // Let the default handler run
};

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function (event) {
  if (
    event.reason &&
    (event.reason.message?.includes?.('ResizeObserver') ||
     event.reason.name === 'ResizeObserverError')
  ) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return false;
  }
}, { capture: true });

// Only override ResizeObserver once
if (window.ResizeObserver && !window.__RESIZE_OBSERVER_OVERRIDE__) {
  window.__RESIZE_OBSERVER_OVERRIDE__ = true;
  
  const OriginalResizeObserver = window.ResizeObserver;
  const resizeObservers = new WeakMap();
  
  // Debounce utility function
  const debounce = (func, wait = 100) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Create a safe wrapper for ResizeObserver
  const SafeResizeObserver = class extends OriginalResizeObserver {
    constructor(callback) {
      // Create a debounced version of the callback
      const debouncedCallback = debounce((entries, observer) => {
        try {
          callback(entries, observer);
        } catch (e) {
          // Only re-throw if it's not a ResizeObserver error
          if (!e.message?.includes('ResizeObserver') && 
              e.name !== 'ResizeObserverError') {
            throw e;
          }
        }
      }, 50); // 50ms debounce for smooth performance
      
      super(debouncedCallback);
      
      // Store the original callback for potential cleanup
      resizeObservers.set(this, { originalCallback: callback });
    }
    
    // Clean up when observer is disconnected
    disconnect() {
      resizeObservers.delete(this);
      super.disconnect();
    }
  };
  
  // Copy static properties from the original ResizeObserver
  try {
    const propNames = Object.getOwnPropertyNames(OriginalResizeObserver);
    for (const prop of propNames) {
      if (prop === 'length' || prop === 'name' || prop === 'prototype') {
        continue;
      }
      const propDesc = Object.getOwnPropertyDescriptor(OriginalResizeObserver, prop);
      if (propDesc && !Object.prototype.hasOwnProperty.call(SafeResizeObserver, prop)) {
        Object.defineProperty(SafeResizeObserver, prop, propDesc);
      }
    }
  } catch (e) {
    // Ignore errors when copying properties
  }
  
  // Replace the global ResizeObserver
  window.ResizeObserver = SafeResizeObserver;
}
