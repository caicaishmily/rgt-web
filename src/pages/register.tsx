import React from "react"
import { Formik, Form } from "formik"
import { Wrapper } from "../components/Wrapper"
import { InputField } from "../components/InputFields"
import { Button, Box } from "@chakra-ui/core"
import { useRegisterMutation } from "../generated/graphql"
import { toErorMap } from "../utils/toErrorMap"
import { useRouter } from "next/router"
import { createUrqlClient } from "../utils/createUrqlClient"
import { withUrqlClient } from "next-urql"

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter()
  const [, register] = useRegisterMutation()

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await register(values)
          // res.data.register?.user?.id
          if (res.data?.register.errors) {
            setErrors(toErorMap(res.data.register.errors))
          } else if (res.data?.register.user) {
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
                Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Register)