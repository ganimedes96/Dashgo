import {Flex, Icon, useBreakpointValue,IconButton} from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSidebarDrawer } from '../../pages/contexts/SidebarDrawercontext'
import { Logo } from './Logo'
import { NatificationsNav } from './NatificationsNav'
import { Profile } from './Profile'
import { SeachBox } from './Search'




export const Header = () =>{
    
    const {onOpen} = useSidebarDrawer()
    
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })


    return(
        <Flex
            as ='header'
            w='100%'
            maxWidth={1480}
            h='20'
            mx='auto'
            mt='4'
            px='6'
            align='center'

        >
            {!isWideVersion && (
                <IconButton
                    aria-label="Open navagation"
                    icon={<Icon as={RiMenuLine}/>}
                    fontSize='24'
                    onClick={onOpen}
                    variant='unstyled'
                    mr='2'
                    mt='3'

                >

                </IconButton>
            )}


            <Logo/>

            {isWideVersion &&  <SeachBox/>}

            <Flex align='center' ml='auto'>
                

                <NatificationsNav/>

                <Profile showProfileData={isWideVersion}/>
                
            </Flex>

        </Flex>
    )
}