// Safe ResizeObserver implementation

// Store the original ResizeObserver if it exists
const OriginalResizeObserver = window.ResizeObserver;

// Create a new ResizeObserver class that wraps the original
class SafeResizeObserver extends OriginalResizeObserver {
  constructor(callback) {
    super((entries, observer) => {
      try {
        callback(entries, observer);
      } catch (error) {
        // Ignore ResizeObserver loop errors
        if (!error.message.includes('ResizeObserver')) {
          // Re-throw non-ResizeObserver errors
          throw error;
        }
      }
    });
  }
}

// Only override if ResizeObserver exists
if (OriginalResizeObserver) {
  window.ResizeObserver = SafeResizeObserver;
}

export const setupResizeObserverErrorHandling = () => {
  // Handle any uncaught ResizeObserver errors
  const handleError = (e) => {
    if (e.message && e.message.includes('ResizeObserver')) {
      e.stopImmediatePropagation();
      return true;
    }
    return false;
  };

  // Add error event listeners
  window.addEventListener('error', handleError);
  
  // Cleanup function
  return () => {
    window.removeEventListener('error', handleError);
  };
};

export default SafeResizeObserver;
