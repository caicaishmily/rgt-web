import React, { useState } from 'react'
import { Box, Button } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputFields';
import { Wrapper } from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation()
  const [complete, setComplete] = useState(false)
  
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword(values)
          setComplete(true)
        }}
      >
        {({isSubmitting}) => 
          complete ? (
            <Box>
              if an account with that email exists, we sent you can email
            </Box>
          )
          : (
            <Form>
              <InputField 
                label="Email"
                placeholder="email"
                name="email"
                type="email"
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
          )
        }
      </Formik>
    </Wrapper>
  );
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)