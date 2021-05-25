import React, { ReactElement, ReactNode, useContext } from "react";

interface ContextInterface {
  name: string;
  author: string;
  url: string;
}

const MyCtx = React.createContext<ContextInterface | null>(null);

const ChildrenComponent: React.FC<{ id: number }> = ({ id }): ReactElement => {
  const appContext = useContext<ContextInterface | null>(MyCtx);
  return (
    <ul>
      <li>{id}</li>
      <li>{appContext?.name}</li>
      <li>{appContext?.author}</li>
      <li>{appContext?.url}</li>
    </ul>
  );
};

const MyComponent: React.FC<{ id: number }> = ({ id }): ReactElement => {
  return <ChildrenComponent id={id} />;
};

const UseContextComponent: React.FC = (): ReactElement => {
  return (
    <MyCtx.Provider
      value={{
        name: "The war",
        author: "Taro",
        url: "https://abc/api",
      }}
    >
      <MyComponent id={Math.floor(Math.random() + 1)} />
    </MyCtx.Provider>
  );
};

export default UseContextComponent;
