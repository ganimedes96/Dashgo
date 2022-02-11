

import { DrawerBody,Box, Drawer, useBreakpointValue,DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader  } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../pages/contexts/SidebarDrawercontext";

import { SidebarNav } from "./SidebarNav";



export const Sidebar = () => {

  const {isOpen, onClose} = useSidebarDrawer()

  const isDrowerSidebar = useBreakpointValue({
      base: true, 
      lg: false
  })

  if(isDrowerSidebar) {
      return(
        <Drawer 
            isOpen={isOpen} 
            placement='left'
            onClose={onClose}>

            <DrawerOverlay>
              <DrawerContent bg='gray.800' p='4'>
                <DrawerCloseButton mt='6'/>
                  <DrawerHeader>Navegacao</DrawerHeader>
                  <DrawerBody>
                    <SidebarNav/>
                  </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>

       </Drawer>
      )
  }



  return (
    <Box as="aside" w="64" mr="8">
      <SidebarNav/>
    </Box>
  );
};
