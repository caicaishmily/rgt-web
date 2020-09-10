import React from "react"
import { Formik, Form } from "formik"
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box } from "@chakra-ui/core"
import { useLoginMutation } from "../generated/graphql"
import { toErorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router"
import { createUrqlClient } from "../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"

const Login: React.FC = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login({options: values})
          if (res.data?.login.errors) {
            setErrors(toErorMap(res.data.login.errors))
          } else if (res.data?.login.user) {
            router.push('/')
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)