import { ReactNode } from "react";

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (_value: boolean) => void;
  children: ReactNode;
}

const Modal = ({ isOpen, setIsOpen, children }: IModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 h-screen w-screen z-50 transition-all">
      <div onClick={() => setIsOpen(false)} className="absolute h-full w-full top-0 left-0 bg-black/40" />
      <div className="z-10 flex flex-col gap-4 lg:min-w-[20rem] w-full max-w-xl p-6 rounded-lg bg-slate-800">
        {children}
      </div>
    </div>
  )
}

export default Modal;
