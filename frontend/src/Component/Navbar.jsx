import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import ProfilePic from "./ProfilePic";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Text color={"#48BB78"} fontSize={"larger"} fontWeight={"bold"}>
            VEGA6 BLOG
          </Text>
        </Box>

        {location.pathname !== "/" && location.pathname !== "/login" ? (
          <ProfilePic />
        ) : (
          ""
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
