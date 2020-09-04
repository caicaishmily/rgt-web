import React from "react"
import { Formik, Form } from "formik"
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box } from "@chakra-ui/core"
import { useMutation } from "urql"

interface rigisterProps {

}

const REGISTER_MUT = `
  mutation($username: String!, $password: String!) {
    rigister(options: { password: $password, username: $username }) {
      user {
        id
        username
      }
      errors {
        field
        message
      }
    }
  }
`

const Register: React.FC<rigisterProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT)

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const res = await register(values)
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