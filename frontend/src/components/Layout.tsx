import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperSize } from "./Wrapper";

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
