import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
} from "@chakra-ui/react";
import { NumericFormat } from "react-number-format";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { useState } from "react";

type ProductCardProps = {
    product: {
        _id: string;
        name: string;
        price: number;
        image: string;
    };
};

const ProductCard = ({ product }: ProductCardProps) => {
    const { deleteProduct } = useProductStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const toast = useToast();
    const handleDeleteProduct = async (pid: string) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "خطا",
                status: "error",
                description: `${message}`,
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: "موفقیت آمیز",
                status: "success",
                description: "محصول با موفقیت حذف شد",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const { updateProduct } = useProductStore();
    const handleUpdateProduct = async (
        pid: string,
        updatedProduct: typeof product
    ) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
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
                description: "محصول با موفقیت ویرایش شد",
                duration: 4000,
                isClosable: true,
                variant: "subtle",
            });
        }
        onClose();
    };

    return (
        <Box
            bgColor={useColorModeValue("white", "gray.800")}
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.4s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <Image
                src={product.image}
                alt={product.name}
                w={"full"}
                h={48}
                objectFit="contain"
                bg="white"
                p={2}
            />
            <Box p={4}>
                <Heading
                    as="h3"
                    size={"md"}
                    mb={2}
                    py={0.4}
                    fontSize={{ sm: "20", md: "18" }}
                    noOfLines={1} /* Ensures it stays on one line */
                    maxW="100%" /* Makes sure it doesn't overflow */
                    fontFamily={"Vazir"}
                >
                    {product.name}
                </Heading>
                <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
                    <NumericFormat
                        value={product.price}
                        allowLeadingZeros
                        thousandSeparator=","
                        displayType="text" /* This removes input styling */
                        renderText={(value) => <span>{value} تومان</span>}
                    />
                </Text>
                <HStack spacing={4}>
                    <IconButton
                        size={"sm"}
                        variant={"ghost"}
                        icon={<FiEdit />}
                        aria-label={"edit"}
                        colorScheme="blue"
                        fontSize={24}
                        onClick={onOpen}
                    />
                    <IconButton
                        size={"sm"}
                        variant={"ghost"}
                        icon={<MdOutlineDeleteForever />}
                        aria-label={"edit"}
                        colorScheme="red"
                        fontSize={28}
                        onClick={() => handleDeleteProduct(product._id)}
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>
                        بروزرسانی محصول
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="نام محصول"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Input
                                placeholder="قیمت محصول"
                                name="price"
                                value={updatedProduct.price}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        price: parseInt(e.target.value),
                                    })
                                }
                            />
                            <Input
                                placeholder="تصویر محصول"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) =>
                                    setUpdatedProduct({
                                        ...updatedProduct,
                                        image: e.target.value,
                                    })
                                }
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"start"}
                    >
                        <Button
                            colorScheme="blue"
                            ml={3}
                            onClick={() =>
                                handleUpdateProduct(
                                    product._id,
                                    updatedProduct
                                )
                            }
                        >
                            بروزرسانی
                        </Button>
                        <Button
                            colorScheme="red"
                            variant={"outline"}
                            onClick={onClose}
                        >
                            لغو
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProductCard;
