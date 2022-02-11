import {Text} from '@chakra-ui/react'

export const Logo = () =>{
    return(
        <Text 
                fontSize={['2xl', '3xl']} 
                fontWeight='bold'
                letterSpacings='tight'
                w='64'
            >
                Dashgo
                <Text as='span' marginLeft='1' color='pink.500'>.</Text>
        </Text>    
    )
}