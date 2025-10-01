/**
 * ResizeObserver Error Suppression
 * This completely silences ResizeObserver errors in production
 * and provides debugging in development
 */

// Only run in browser environment
if (typeof window !== 'undefined') {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Store original error handler
  const originalErrorHandler = window.onerror;
  
  // Override the global error handler
  window.onerror = function(message, source, lineno, colno, error) {
    // Check for ResizeObserver errors
    const isResizeObserverError = 
      (typeof message === 'string' && 
       (message.includes('ResizeObserver') || 
        message.includes('ResizeObserver loop') ||
        message.includes('ResizeObserver loop limit exceeded'))) ||
      (error?.message?.includes?.('ResizeObserver')) ||
      (error?.name === 'ResizeObserverError');
    
    // Suppress ResizeObserver errors
    if (isResizeObserverError) {
      if (isDevelopment) {
        console.debug('[ResizeObserver] Suppressed error:', { message, error });
      }
      return true; // Prevent default error handler
    }
    
    // Call original error handler if it exists
    if (typeof originalErrorHandler === 'function') {
      return originalErrorHandler(message, source, lineno, colno, error);
    }
    
    return false;
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    const error = event.reason || event.detail?.reason;
    const isResizeObserverError = 
      error?.message?.includes?.('ResizeObserver') ||
      error?.name === 'ResizeObserverError';
    
    if (isResizeObserverError) {
      if (isDevelopment) {
        console.debug('[ResizeObserver] Suppressed unhandled rejection:', error);
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      return false;
    }
  }, { capture: true });

  // Only override ResizeObserver once
  if (window.ResizeObserver && !window.__RESIZE_OBSERVER_OVERRIDE__) {
    window.__RESIZE_OBSERVER_OVERRIDE__ = true;
    
    const OriginalResizeObserver = window.ResizeObserver;
    
    // Create a safe wrapper that swallows all errors
    const SafeResizeObserver = class extends OriginalResizeObserver {
      constructor(callback) {
        // Wrap the callback to prevent errors from bubbling up
        const safeCallback = (entries, observer) => {
          try {
            callback(entries, observer);
          } catch (e) {
            if (isDevelopment) {
              console.debug('[ResizeObserver] Callback error:', e);
            }
          }
        };
        
        super(safeCallback);
      }
      
      // Override observe to prevent errors
      observe(target, options) {
        try {
          return super.observe(target, options);
        } catch (e) {
          if (isDevelopment) {
            console.debug('[ResizeObserver] Observe error:', e);
          }
          return null;
        }
      }
    };
    
    // Replace the global ResizeObserver
    window.ResizeObserver = SafeResizeObserver;
    
    if (isDevelopment) {
      console.debug('[ResizeObserver] Error handling has been enabled');
    }
  }
}
