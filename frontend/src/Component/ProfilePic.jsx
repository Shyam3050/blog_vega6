import { Avatar, Box, Flex, keyframes } from "@chakra-ui/react";

const ProfilePic = () => {

  const color = "teal";

  const pulseRing = keyframes`
	0% {
    transform: scale(0.23);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        h= {16}
        w= {16}
        overflow="hidden"
      >
        {/* Ideally, only the box should be used. The <Flex /> is used to style the preview. */}
        <Box
          as="div"
          position="relative"
          w={16}
          h={16}
          _before={{
            content: "''",
            position: "relative",
            display: "block",
            width: "300%",
            height: "300%",
            boxSizing: "border-box",
            marginLeft: "-100%",
            marginTop: "-100%",
            borderRadius: "50%",
            bgColor: color,
            animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
          }}
        >
          <Avatar
            src="https://i.pravatar.cc/300"
            size="full"
            position="absolute"
            top={0}
          />
        </Box>
      </Flex>
    </>
  );
};

export default ProfilePic;
