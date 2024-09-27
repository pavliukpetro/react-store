import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { set } from 'firebase/database';
import { toast } from 'react-toastify';
import useCart from '../../hook/use-cart';

function MinicartItem({ product }) {
    // console.log(product);

    const { cart, cartRef } = useCart();

    function handleRemoveCartItem() {
        // console.log('handleRemoveCartItem', product.id);

        const filtederProducts = cart.products.filter((cartProduct) => {
            return cartProduct.id !== product.id;
        });

        const newCart = {
            products: filtederProducts,
            total: cart.total - product.price * product.qty,
            totalQty: cart.totalQty - product.qty,
        };

        // firebase update cart
        set(cartRef, newCart)
            .then(() => {
                toast('Product is removed');
            })
            .catch((error) => {
                toast(error.message);
            });
    }

    return (
        <Card
            direction={{ base: 'column', sm: 'row' }}
            overflow="hidden"
            variant="outline"
            alignItems={'start'}
            border="none"
        >
            <Image
                maxW={{ base: '100%', sm: '100px' }}
                src={product.image}
                alt="Caffe Latte"
            />

            <Stack>
                <CardBody pt="0" pb="2">
                    <Heading size="sm">{product.title}</Heading>

                    <Text py="2" as={'span'} me={2}>
                        {product.qty} x {product.price}
                    </Text>
                    <Text py="2" as={'span'}>
                        ${product.qty * product.price}
                    </Text>
                </CardBody>

                <CardFooter pt="0">
                    <Button
                        variant="solid"
                        size={'sm'}
                        colorScheme="red"
                        onClick={handleRemoveCartItem}
                    >
                        Remove
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

export default MinicartItem;
