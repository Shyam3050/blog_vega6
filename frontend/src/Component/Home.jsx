import { Box, Heading, Container, Text, Button, Stack, SimpleGrid } from "@chakra-ui/react";
import BlogItem from "./BlogItem";
const Home = () => {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to <br />
            <Text as={"span"} color={"green.400"}>
              Vega6 Horizon Blogs
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            your gateway to a world of diverse knowledge and insights. At Vega6
            Horizon, we explore the vast expanse of topics, from cutting-edge
            technology and business trends to lifestyle, travel, and personal
            development.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Create Blog
            </Button>
          </Stack>
          <Stack>
            <Heading size="sm" fontSize="50px" mb={10}>
              Your Blogs
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
              <BlogItem/>
              <BlogItem/>
              <BlogItem/>
              <BlogItem/>
              <BlogItem/>
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
