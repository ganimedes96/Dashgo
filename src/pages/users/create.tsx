import {Box, Divider, Flex, Heading, VStack,SimpleGrid, HStack, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {Header} from '../../components/Header'
import {Input} from '../../components/Form/Input'
import { Sidebar} from '../../components/Sidebar'
import {useMutation} from "react-query"


import {SubmitHandler, useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { api } from '../../services/api'
import { queryClient } from '../../services/queryClient'


type CreateUserformData= {
    name: string;
    email:string;
    password: string;
    password_confirmation: string;
  }

const CreateUserformSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatorio'),
    
    email: yup.string().required('E-mail obrigatorio').email('E-mail invalido'),
    password: yup.string().required('Senha obrigatoria').min(6,'No minimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

export default function CreateUser () {

    const router = useRouter()

    const createUser = useMutation(async (user: CreateUserformData) =>{
        const response = await api.post(`users`,{
            user:{
                ...user,
                created_at: new Date(),
            }
        })
        return response.data.user
    },{
       onSuccess: ()=>{
           queryClient.invalidateQueries('users')
       } 
    })
       


    const {register, handleSubmit, formState} = useForm({
        resolver: yupResolver(CreateUserformSchema)
      })

      const {errors} = formState

      const handleCreateUser:SubmitHandler<CreateUserformData> = async(values) =>{

       await createUser.mutateAsync(values)

       router.push('/users')

    } 

    return(
        <Box>
            <Header/>
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar/>
                <Box 
                    as='form'
                    flex='1' 
                    borderRadius={8} 
                    bg='gray.800' 
                    p={['6','8']}
                    onSubmit={handleSubmit(handleCreateUser)}
                >

                    <Heading size='lg' fontWeight='normal'  >Criar usuario</Heading>        
                    <Divider my='6' borderColor='gray.700'/>

                    <VStack spacing='8'>
                        <SimpleGrid spacing={['6','8']} minChildWidth='240px' w='100%'>
                            <Input 
                                name='name' 
                                type='name' 
                                label='Nome completo' 
                                error={errors.name}
                                {...register('name')}/>
                            <Input 
                                name='email' 
                                type='email' 
                                label='E-mail'
                                error={errors.email}
                                {...register('email')}/>
                        </SimpleGrid>
                        <SimpleGrid spacing={['6','8']} minChildWidth='240px' w='100%'>
                            <Input 
                                name='password' 
                                type='password' 
                                label='senha' 
                                error={errors.password}
                                {...register('password')}/>
                            <Input 
                                name='password_confirmation' 
                                type='password' 
                                label='Confirmacao de senha'
                                error={errors.password_confirmation}
                                {...register('password_confirmation')}/>
                        </SimpleGrid>
                    </VStack>    
                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href='/users' passHref>
                                <Button 
                                    as='a' 
                                    
                                    colorScheme='whiteAlpha'
                                    >Cancelar</Button>
                            </Link>
                            <Button 
                                type='submit' 
                                colorScheme='pink'
                                isLoading={formState.isSubmitting}
                            >Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex> 
        </Box>
    )
} 