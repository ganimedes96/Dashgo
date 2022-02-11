import { Flex, Text, Avatar,Box } from "@chakra-ui/react";


interface ProfileProps{
  showProfileData?: boolean;
}



export const Profile = ({showProfileData= true}: ProfileProps) => {
  return (
    <Flex align="center">
        {showProfileData && (
          <Box mr="4" textAlign="right">
          <Text>Hudson Felix</Text>
          <Text color="gray.300" fontSize="small">
            hudsonfelix69@gmail.com
          </Text>
        </Box>
        )}


      <Avatar
        size="md"
        name="Hudson Felix"
        src="https://github.com/ganimedes96.png"
      />
    </Flex>
  );
};
