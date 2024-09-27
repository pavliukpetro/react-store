import {
    Badge,
    Box,
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import { FaCartShopping } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import useCart from '../hook/use-cart';
import MinicartItem from './minicart/MinicartItem';

function HeaderCart() {
    const { cart } = useCart();
    const navigate = useNavigate();

    return (
        <Popover>
            <PopoverTrigger>
                <Box pos="relative" me={4}>
                    <IconButton
                        p={2}
                        colorScheme="teal"
                        aria-label="Search database"
                        icon={<FaCartShopping />}
                    />
                    <Badge
                        colorScheme="green"
                        pos="absolute"
                        top={-2}
                        right={-2}
                    >
                        {cart?.totalQty ?? 0}
                    </Badge>
                </Box>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Mini Cart</PopoverHeader>
                <PopoverBody>
                    {cart?.totalQty === 0 && <Box py={10}>Cart is empty</Box>}
                    {cart?.totalQty > 0 &&
                        cart.products.map((product) => {
                            return (
                                <MinicartItem
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })}
                </PopoverBody>
                <PopoverFooter>
                    <Text mb="2">Total: ${cart?.total}</Text>
                    <Button size="sm" onClick={() => navigate('/checkout')}>
                        Go to checkout
                    </Button>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    );
}

export default HeaderCart;
