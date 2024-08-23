import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import BlogItem from "./BlogItem";
import { imageDb } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://blog-vega6.onrender.com/api/blog");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  console.log(blogs)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const uploadResult = await uploadBytes(imgRef, image);
      const imgUrl = await getDownloadURL(uploadResult.ref);

      const userData = {
        title,
        image: imgUrl,
        description,
        userid: JSON.parse(localStorage.getItem("user")).data._id,
      };

      const response = await fetch("https://blog-vega6.onrender.com/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        alert("Try Again");
        return;
      }

      await response.json();
      fetchBlogs(); // Re-fetch blogs after adding a new one
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

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
            Your gateway to a world of diverse knowledge and insights. At Vega6
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
              onClick={onOpen}
            >
              Create Blog
            </Button>
          </Stack>
          <Stack>
            <Heading size="sm" fontSize="50px" mb={10}>
              Your Blogs
            </Heading>
            <SimpleGrid columns={2} spacing={10}>
              {blogs.length > 0
                ? blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
                : ""}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl id="image" isRequired mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </FormControl>

            <FormControl id="description" isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
