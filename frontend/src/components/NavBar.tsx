import {
    Button,
    Container,
    Flex,
    HStack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router";
import { FaRegPlusSquare } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"1440px"} px={4}>
            <Flex
                h={16}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontWeight="bold"
                >
                    <Link to={"/"}>فروشگاه کالا🛒</Link>
                </Text>
                <HStack gap={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button
                            size="lg"
                            variant="outline"
                            p={0}
                            fontSize={20}
                        >
                            <FaRegPlusSquare />
                        </Button>
                    </Link>

                    <Button
                        size="lg"
                        variant="outline"
                        p={0}
                        onClick={toggleColorMode}
                    >
                        {colorMode === "dark" ? <LuMoon /> : <GoSun />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;
