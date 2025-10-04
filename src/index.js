import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { setupResizeObserverErrorHandling } from './utils/resizeObserverUtils';

// Setup ResizeObserver error handling
const cleanupResizeObserverHandling = setupResizeObserverErrorHandling();

// Cleanup on unmount
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Cleanup function when the app is unmounted
const cleanup = () => {
  cleanupResizeObserverHandling?.();
};

// Handle app unmount
const appRoot = root._internalRoot;
if (appRoot && typeof appRoot.getPublicRootInstance === 'function') {
  const originalUnmount = root.unmount || root._unmount;
  root.unmount = root._unmount = function() {
    cleanup();
    return originalUnmount.apply(this, arguments);
  };
}

// Also clean up if the root element is removed
document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === rootElement) {
          cleanup();
        }
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
