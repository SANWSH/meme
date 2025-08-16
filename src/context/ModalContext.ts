import React from "react";

interface IModalContext {
  isOpen: boolean | null;
  show: (key:number, component: React.Component|null) => void | null;
  hide: (key:number) => void | null;
}

const ModalContext = React.createContext<IModalContext>({
  isOpen: null,
  show: () => null,
  hide: () => null,
})

export default ModalContext;