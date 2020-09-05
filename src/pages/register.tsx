import React from "react"
import { Formik, Form } from "formik"
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box } from "@chakra-ui/core"
import { useRegisterMutation } from "../generated/graphql"

interface rigisterProps {

}

const Register: React.FC<rigisterProps> = ({}) => {
  const [, register] = useRegisterMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values)
          // res.data.rigister?.user?.id
          if (res.data?.rigister.errors) {
            setErrors({
              username: "username error"
            })
          }
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