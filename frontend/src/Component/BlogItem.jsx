  import {
    Box,
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import { NavLink } from "react-router-dom";

  const BlogItem = ({blog}) => {

    return (
      <Card maxW="sm">
        <CardBody>
          <Box w={200} m={"auto"}>
            <Image
              src={blog.image}
              alt={blog.title}
              borderRadius="lg"
              w={"100%"}
              h={"100%"}
            />
          </Box>
          <Stack mt="6" spacing="3">
            <Heading size="md">{blog.title}</Heading>
            <Text>{blog.description}</Text>
          </Stack>
        </CardBody>

        <CardFooter>
          <Flex w={"100%"} justifyContent={"space-between"}>
            <ButtonGroup spacing="2">
              <NavLink to={`/blog/${blog._id}`}>
                <Button variant="solid" colorScheme="blue">
                  View
                </Button>
              </NavLink>
              <Button variant="ghost" colorScheme="blue">
                Edit
              </Button>
            </ButtonGroup>
            <Button variant="ghost" colorScheme="red">
              Delete
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    );
  };

  export default BlogItem;
