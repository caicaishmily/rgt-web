import React from 'react'
import { NextPage } from 'next'
import { Wrapper } from '../../components/Wrapper'
import { Formik, Form } from 'formik'
import login from '../login'
import { toErorMap } from '../../utils/toErrorMap'
import { InputField } from '../../components/InputFields'
import { Box, Button } from '@chakra-ui/core'

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          // const res = await login(values)
          // if (res.data?.login.errors) {
          //   setErrors(toErorMap(res.data.login.errors))
          // } else if (res.data?.login.user) {
          //   router.push('/')
          // }
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

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  }
}

export default ChangePassword