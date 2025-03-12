"use client";
import { useFormStatus } from "react-dom";

import Button from "./Button";
import SvgLoaderComponent from "./SVGLoaderComponent";

function SubmitButton({ children, calssName, ...rest }) {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      {...rest}
      className={`flex items-center justify-center gap-x-4 py-4 w-full
        ${calssName}
        `}
    >
      {children}

      {pending && <SvgLoaderComponent />}
    </Button>
  );
}
export default SubmitButton;
