import { useProductStore } from "@/store/product";
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router";
import { ProductBase } from "@/store/product";
const CreatePage = () => {
    const [newProduct, setNewProduct] = useState<ProductBase>({
        name: "",
        price: 0,
        image: "",
    });

    const toast = useToast();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.name === "price"
                    ? parseInt(e.target.value)
                    : e.target.value,
        }));
    };

    const { createProduct } = useProductStore();
    const handleCreateProduct = async () => {
        try {
            const { success, message } = await createProduct(newProduct);
            if (!success) {
                toast({
                    title: "خطا",
                    status: "error",
                    description: `${message}`,
                    duration: 4000,
                    isClosable: true,
                    variant: "subtle",
                });
            } else {
                toast({
                    title: "موفقیت آمیز",
                    status: "success",
                    description: "محصول با موفقیت ساخته شد",
                    duration: 4000,
                    isClosable: true,
                    variant: "subtle",
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "خطا",
                status: "error",

                duration: 4000,
                isClosable: true,
            });
        }
    };

    return (
        <Container maxW={"md"}>
            <VStack>
                <Heading
                    as={"h1"}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    fontWeight={"bold"}
                    textAlign={"center"}
                    my={50}
                >
                    ایجاد محصول
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded={"lg"}
                    shadow={"sm"}
                >
                    <VStack gap={4}>
                        <Input
                            placeholder="نام محصول"
                            name="name"
                            borderColor={"gray.300"}
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="قیمت محصول"
                            name="price"
                            type="number"
                            borderColor={"gray.300"}
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="تصویر محصول"
                            name="image"
                            borderColor={"gray.300"}
                            value={newProduct.image}
                            onChange={handleInputChange}
                        />
                        <Container
                            display={"flex"}
                            gap={4}
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Button
                                onClick={handleCreateProduct}
                                size="sm"
                                colorScheme="green"
                            >
                                ایجاد محصول
                            </Button>
                            <Link to="/">
                                <Button
                                    size="sm"
                                    colorScheme="blue"
                                    variant={"outline"}
                                >
                                    صفحه اصلی
                                </Button>
                            </Link>
                        </Container>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
