import React from "react"
import { Formik, Form } from "formik"
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box, Flex, Link } from "@chakra-ui/core"
import { useLoginMutation } from "../generated/graphql"
import { toErorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router"
import { createUrqlClient } from "../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"
import NextLink from "next/link"

const Login: React.FC = ({}) => {
  const router = useRouter()
  const [, login] = useLoginMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await login(values)
          if (res.data?.login.errors) {
            setErrors(toErorMap(res.data.login.errors))
          } else if (res.data?.login.user) {
            if(typeof router.query.next === "string") {
              router.push(router.query.next)
            } else {
              router.push('/')
            }
          }
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField 
              label="UsernameOrEmail"
              placeholder="username or email"
              name="usernameOrEmail"
            />
            <Box mt={4}>
              <InputField 
                label="Password"
                placeholder="password"
                name="password"
                type="password"
              />
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link ml="auto"> forgot password</Link>
              </NextLink>
            </Flex>
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