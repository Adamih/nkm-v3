import React from "react";
import { Box } from "@chakra-ui/core";
import theme from "../theme";

export type WrapperSize = "sm" | "md";
export type WrapperVariant = "outline" | "solid" | "unstyled";

interface WrapperProps {
  size?: WrapperSize;
  variant?: WrapperVariant;
  variantColor?: string;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  size = "md",
  variant = "unstyled",
  variantColor = theme.colors.gray["100"],
}) => {
  return (
    <Box
      mt="8"
      mx="auto"
      maxW={size === "md" ? "800px" : size === "sm" ? "500px" : undefined}
      w="100%"
      border={variant === "outline" && `solid ${variantColor} 1px`}
      borderRadius="32px"
      padding={5}
      background={variant === "solid" && variantColor}
    >
      {children}
    </Box>
  );
};
