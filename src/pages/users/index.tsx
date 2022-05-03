import {useBreakpointValue,Box, Button,Text, Checkbox, Flex, Heading, Icon, Table, Tbody, Th, Thead, Tr, Td, Spinner, Link} from '@chakra-ui/react'
import { RiAddLine } from 'react-icons/ri'
import {Header} from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar} from '../../components/Sidebar'
import NextLink from 'next/link'
import { getUsers, useUsers } from '../../services/hooks/useUsers'
import { useState } from 'react'
import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api'
import { GetServerSideProps } from 'next/types'


type User = {

    id: string,
    name: string,
    email: string,
    created_at: string,
}

export default function UserList () {

    const [page, setPage] = useState(1)

    const {data, isLoading,isFetching, error} = useUsers(page)



    
    const isWideVersion = useBreakpointValue({
        base: false,
        lg:true
    })

    const  handlePrefetchUser = async (userId: string) => {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data
        },{
            staleTime: 1000* 60*10
        }) 
    }

    return(
        <Box>
            <Header/>
            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar/>
                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWidth='normal' >
                            Usuarios
                            {!isLoading && isFetching && <Spinner  size='sm' color='gray.500' ml='4'/>}
                        </Heading>
                        <NextLink href='/users/create' passHref>

                        <Button
                            as='a'
                            size='sm'
                            fontSize='sm'
                            colorScheme='pink'
                            leftIcon={<Icon as={RiAddLine} fontSize='23'/>}
                        >
                            Criar Novo
                        </Button>
                        </NextLink>
                    </Flex>
                       {isLoading ?(
                           <Flex justify='center'>
                               <Spinner/>
                           </Flex>
                       ): error ? (
                           <Flex>Falha ao obter dados dos usuarios</Flex>
                       ):(
                        <>
                        <Table colorScheme='whiteAlpha'>
                        <Thead>
                            <Tr>
                                <Th px={['4','4','6']} color='gray.300' width='8'>
                                    <Checkbox colorScheme='pink'/>
                                </Th>
                                <Th>Usuarios</Th>
                                {isWideVersion && <Th>Data de cadastro</Th>}
                                
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.users.map((user:User) =>{
                                return(
                                    <Tr key={user.id}>
                                        <Td px={['4','4','6']}>
                                            <Checkbox colorScheme='pink'/>   
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Link color='purple.400' onMouseEnter={()=>handlePrefetchUser(user.id)}>
                                                 <Text fontWeight='bold'>{user.name}</Text>
                                                </Link>
                                                <Text fontSize='sm' color='gray.300'>{user.email}</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion && <Td>{user.created_at}</Td>}
                                        
                                     </Tr>
                                )
                            })}
                        </Tbody>

                        
                    </Table> 
                    <Pagination
                        totalCountOfRegisters={data.totalCount}
                        currentPage={page}
                        onPageChange={setPage}
                    />   
                        </>
                       )}
                </Box>
            </Flex> 
        </Box>
    )
} 

// export const getServerSideProps:GetServerSideProps = async () => {

//     const {users, totalCount} =await getUsers(1);


//     return {
//         props: {
//             users,
//         }
//     }
// }