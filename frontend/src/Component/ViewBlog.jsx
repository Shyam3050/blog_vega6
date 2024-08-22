import { Box, Button, ButtonGroup, Container, Heading, Image, Stack, Text } from "@chakra-ui/react";

const ViewBlog = () => {
  return (
    <>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Back
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Home
            </Button>
          </ButtonGroup>

          <Box>
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              w={"100%"}
              h={"100%"}
            />
          </Box>

          <Heading size="lg">Blog Details</Heading>
          <Text color={"gray.500"} textAlign={"left"}>
            your gateway to a world of diverse knowledge and insights. At Vega6
            Horizon, we explore the vast expanse of topics, from cutting-edge
            technology and business trends to lifestyle, travel, and personal
            development. your gateway to a world of diverse knowledge and
            insights. At Vega6 Horizon, we explore the vast expanse of topics,
            from cutting-edge technology and business trends to lifestyle,
            travel, and personal development. your gateway to a world of diverse
            knowledge and insights. At Vega6 Horizon, we explore the vast
            expanse of topics, from cutting-edge technology and business trends
            to lifestyle, travel, and personal development. your gateway to a
            world of diverse knowledge and insights. At Vega6 Horizon, we
            explore the vast expanse of topics, from cutting-edge technology and
            business trends to lifestyle, travel, and personal development.
          </Text>
        </Stack>
      </Container>
    </>
  );
};

export default ViewBlog;
