import React, { ReactNode } from "react";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer: React.FC<DrawerProps> = ({ children, isOpen, setIsOpen }) => {
  return (
    <div
      className={
        "fixed overflow-hidden z-10 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? "transition-all ease-in-out duration-300 translate-x-0"
          : "transition-all translate-x-full")
      }
    >
      <div
        className={
          "w-screen max-w-lg right-0 bg-white dark:bg-gray-900 absolute h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          (isOpen ? "translate-x-0" : "translate-x-full")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 h-full p-8">
          {children}
        </article>
      </div>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </div>
  );
};

export default Drawer;
