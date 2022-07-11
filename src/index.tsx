import { createContext, useContext, useEffect, useState } from "react";
import { ModalPopup } from "./ModalPopup";
import { TypeEnum } from "./TypeEnum";
export { TypeEnum } from "./TypeEnum";

const ModalContext = createContext<ProviderType>({ openModal: () => {} });

export const useModal = () => {
  return useContext(ModalContext);
};

type ProviderType = {
  openModal: (errorMsg: string, type: TypeEnum) => void;
};

type Props = {
  children: React.ReactNode;
};

export const ModalProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<TypeEnum>(TypeEnum.error);

  /** Opens a global modal for three seconds
   * @param {string} message - Message to show
   * @param {string} type - Could be either: 'error|warning|success'
   */
  const openModal = (message: string, type: TypeEnum) => {
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
      <ModalPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        errorMsg={message}
        type={type}
      />
      {children}
    </ModalContext.Provider>
  );
};
