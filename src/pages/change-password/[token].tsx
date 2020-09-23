import React, { useState } from 'react'
import { NextPage } from 'next'
import { Wrapper } from '../../components/Wrapper'
import { Formik, Form } from 'formik'
import { toErorMap } from '../../utils/toErrorMap'
import { InputField } from '../../components/InputFields'
import { Box, Button, Flex, Link } from '@chakra-ui/core'
import { useChangePasswordMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'
import NextLink from "next/link"
import { createUrqlClient } from '../../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

const ChangePassword: NextPage = () => {
  const router = useRouter()
  const [, changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState("")

  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const res = await changePassword({
            newPassword: values.newPassword,
            token: typeof router.query.token === "string" ? router.query.token : "",
          })

          if (res.data?.changePassword.errors) {
            const errorMap = toErorMap(res.data.changePassword.errors)

            if("token" in errorMap) {
              setTokenError(errorMap.token)
            }
            setErrors(errorMap)
          } else if (res.data?.changePassword.user) {
            router.push('/')
          }
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <InputField 
              label="NewPassword"
              placeholder="new password"
              name="newPassword"
              type="password"
            />
            {
              tokenError 
              ? (
                <Flex>
                  <Box mr={2} style={{ color: "red" }}>
                    { tokenError }
                  </Box>
                  <NextLink href="/forgot-password">
                    <Link>
                      click here to get a new one
                    </Link>
                  </NextLink>
                </Flex>
              )
              : null
            }
            <Button 
              type="submit"
              mt={4}
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ChangePassword)