import { useEffect } from "react";
import { Link } from "react-router";
import { useProductStore } from "@/store/product";
import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="4xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={{ base: "xl", sm: "2xl" }}
                    fontWeight="bold"
                    textAlign="center"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    color="transparent"
                    my={4}
                >
                    محصولات فعلی
                </Text>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    w="full"
                    gap={6}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        textAlign="center"
                        color="gray.500"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={4}
                    >
                        محصولی یافت نشد!😓
                        <Link to="/create">
                            <Text
                                as="span"
                                color="blue.500"
                                _hover={{ color: "blue.400" }}
                            >
                                ساخت محصول +
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
