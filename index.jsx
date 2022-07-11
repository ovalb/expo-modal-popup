import { createContext, useContext, useEffect, useState } from "react";
import { ErrorModal } from "./ErrorModal.js";

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  /** Opens a global modal for three seconds
   * @param {string} message - Message to show
   * @param {string} type - Could be either: 'error|warning|success'
   */
  const openModal = (message, type) => {
    // I think I might need a reducer because I want it to cause only one rerendering
    // while (!isOpen);

    setMessage(message);
    setType(type);
    setIsOpen(true);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      if (isOpen) {
        setIsOpen(false);
      }
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [isOpen]);

  const value = {
    openModal: openModal,
  };

  return (
    <ModalContext.Provider value={value}>
      <ErrorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        errorMsg={message}
        type={type}
      />
      {children}
    </ModalContext.Provider>
  );
};
