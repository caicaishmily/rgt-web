import React from "react"
import { Formik, Form } from "formik"
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box } from "@chakra-ui/core"

interface rigisterProps {

}

const Register: React.FC<rigisterProps> = ({}) => {
  function validateName(value) {
    let error
    if (!value) {
      error = "Name is required"
    } else if (value !== "Naruto") {
      error = "Jeez! You're not a fan 😱"
    }
    return error
  }

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values)
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField 
              label="Username"
              placeholder="username"
              name="username"
            />
            <Box mt={4}>
              <InputField 
                label="Password"
                placeholder="password"
                name="password"
                type="password"
              />
            </Box>
            <Button 
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              variantColor="teal"
            >
                Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default Register