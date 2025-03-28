import { Box, Spinner, useColorModeValue } from "@chakra-ui/react";

const LoadingSpinner = () => (
    <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex="overlay"
        bg={useColorModeValue("whiteAlpha.500", "blackAlpha.500")}
    >
        <Spinner
            size="xl"
            thickness="4px"
            speed="0.7s"
            color={useColorModeValue("blue.500", "blue.300")}
        />
    </Box>
);

export default LoadingSpinner;
