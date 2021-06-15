import { useEffect, useRef, FunctionComponent, MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

const Modal: FunctionComponent = ({ children }) => {
  // using "useRef" to persist the reference to the modal HTML element
  // As we can have multiple modals, we cannot extract the reference to a constant outside the Modal
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  elRef.current = elRef.current || document.createElement('div');

  useEffect(() => {
    if (!modalRoot || !elRef.current) return;
    modalRoot.appendChild(elRef.current);
    // Returning the destructor function to remove the modal from the DOM
    return () => {
      if (elRef.current) modalRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
