import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperSize, WrapperVariant } from "./Wrapper";

interface LayoutProps {
  size?: WrapperSize;
}

export const Layout: React.FC<LayoutProps> = ({ children, size }) => {
  return (
    <>
      <NavBar />
      <Wrapper size={size}>{children}</Wrapper>
    </>
  );
};
