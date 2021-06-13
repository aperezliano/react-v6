import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Moving document.getElementById('modal') inside the component so that's not executed in Node
let modalRoot;

const Modal = ({ children }) => {
  modalRoot = modalRoot ? modalRoot : document.getElementById('modal');

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
