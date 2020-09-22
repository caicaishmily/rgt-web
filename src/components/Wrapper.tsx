import React from "react"
import { Box } from "@chakra-ui/core"

export type WrapperVariant = "small" | "regular"

interface WrapperProps {
  variant?: WrapperVariant
}

export const Wrapper: React.FC<WrapperProps> = ({children, variant = "regular"}) => {
  return (
    <Box 
      mx="auto" 
      mt="8" 
      maxW={variant === "regular" ? "600px" : "400px"} 
      width="100%"
    >
      {children}
    </Box>
  )
}