import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal = ({ children }) => {
  // using "useRef" to persist the reference to the modal HTML element
  // As we can have multiple modals, we cannot extract the reference to a constant outside the Modal
  const elRef = useRef(null);
  elRef.current = elRef.current || document.createElement('div');

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    // Returning the destructor function to remove the modal from the DOM
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
