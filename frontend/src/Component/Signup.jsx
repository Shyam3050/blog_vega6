import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import { imageDb } from "../../firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

import { v4 } from "uuid";

const Signup = () => {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !image) {
      return setError("Please fill in all details");
    }

    setLoading(true);

    try {
      // Upload image to Firebase
      const imgRef = ref(imageDb, `files/${v4()}`);
      const uploadResult = await uploadBytes(imgRef, image);
      const imgUrl = await getDownloadURL(uploadResult.ref);

      // Prepare user data
      const userData = {
        userName: firstName + " " + lastName,
        email,
        password,
        pic: imgUrl,
      };

      // Send data to backend
      const response = await fetch("https://blog-vega6.onrender.com/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
     
      if (!response.ok) {
        alert("Try Again");
      }

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard")
      // Handle success, maybe redirect to login or show a success message
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to join our community and start sharing your stories ✨
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            {error && (
              <Text color="red.500" mb={4}>
                {error}
              </Text>
            )}
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FormControl>
              <FormControl id="profilepic" isRequired>
                <FormLabel>Profile pic</FormLabel>
                <Input
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif, .bmp, .webp"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  isLoading={loading}
                  size="lg"
                  bg={"#48BB78"}
                  color={"white"}
                  _hover={{
                    bg: "#259b56",
                  }}
                  onClick={submitHandler}
                >
                  {loading ? "Loading...." : "Sign up"}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?
                  <Link color={"blue.400"}>
                  
                    <NavLink to="/login">Login</NavLink>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Signup;
