import {Flex, Button, Stack} from '@chakra-ui/react'
import {Input} from '../components/Form/Input'
import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


type signInformData= {
  email: string;
  password: string;
}


const signInformSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
  password: yup.string().required('password obrigatorio'),
})

export default function Home() {
  
  const {register, handleSubmit, formState} = useForm({
    resolver: yupResolver(signInformSchema)
  })


  const {errors} = formState
  console.log(errors)

const handleSignIn: SubmitHandler <signInformData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve,2000))
  }

  
  
  
  return (
    <Flex 
      w='100vw' 
      h='100vh' 
      align='center' 
      justify='center' >

      <Flex 
        as='form'
        width='100%'
        maxWidth={360}
        bg='gray.800'
        p='8'
        borderRadius={8}
        flexDirection='column'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing='4'>

          <Input name='email' type='email' label='E-mail'error={errors.email} {...register('email')}/>
          <Input name='password' type='password' label='Senha'error={errors.password}{...register('password')}/>

        </Stack>
        
        <Button 
          type='submit' 
          mt='6' 
          colorScheme='pink'
          size='lg'
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
