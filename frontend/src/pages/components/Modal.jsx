import React, { useEffect, useRef } from 'react';

const maxWidthClasses = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  xl: 'sm:max-w-xl',
  '2xl': 'sm:max-w-2xl',
};

const Modal = ({ name, show = false, maxWidth = '2xl', onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose();
      }
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current.querySelectorAll(
          'a, button, input:not([type="hidden"]), textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };

    if (show) {
      document.body.classList.add('overflow-y-hidden');
      document.addEventListener('keydown', handleKeyDown);
      // Focus first focusable element after a short delay
      setTimeout(() => {
        const focusableElements = modalRef.current.querySelectorAll(
          'a, button, input:not([type="hidden"]), textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length) {
          focusableElements[0].focus();
        }
      }, 100);
    } else {
      document.body.classList.remove('overflow-y-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.classList.remove('overflow-y-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby={name}
      onClick={onClose}
    >
      <div
        className="fixed inset-0 bg-gray-500 opacity-75"
        aria-hidden="true"
      ></div>

      <div
        className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full ${maxWidthClasses[maxWidth] || maxWidth} sm:mx-auto`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
