"use client"
const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};
function Button({ handleClick, type="primary", className, children ,...rest}) {
  return (
    <button onClick={handleClick} type={btnType[type]} className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
