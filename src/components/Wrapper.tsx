import React from "react"
import { Box } from "@chakra-ui/core"

interface WrapperProps {
  variant?: "small" | "regular"
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