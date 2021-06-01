import React, { ReactElement, useState } from "react";

interface SET_TYPE {
  setValue: (value: number) => void;
}

const useNumber = (initialValue: number) => useState<number>(initialValue);

type UseNumberValue = ReturnType<typeof useNumber>[0];
type UseNumberSetValue = ReturnType<typeof useNumber>[1];

const Button: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title: string }
> = ({ children, title, ...props }) => {
  return <button {...props}>{title ?? children}</button>;
};
export default function CustomHookComponent(): ReactElement {
  const [value, setValue] = useNumber(0);
  return (
    <div>
      hello
      <Button title="Add new " />
    </div>
  );
}
