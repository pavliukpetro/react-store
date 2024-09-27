import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { child, push, ref, update } from 'firebase/database';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../firebase';
import useCart from '../hook/use-cart';

export default function CheckoutPage() {
    const [shippingMethod, setShippingMethod] = useState('standard');
    const [shippingCost, setShippingCost] = useState(4.99);
    const { cart } = useCart();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const products = useMemo(() => {
        return cart?.products;
    }, [cart]);

    function handleCheckout() {
        const newOrder = {
            products: products,
            user: { id: currentUser.uid, email: currentUser.email },
            shippingMethod: shippingMethod,
            total: cart.total + shippingCost,
        };

        const newOrderKey = push(child(ref(database), 'orders')).key;

        update(ref(database, `orders/${newOrderKey}`), newOrder)
            .then(() => {
                console.log('Order created');

                update(ref(database, `users/${currentUser.uid}/cart`), {
                    products: [],
                    total: 0,
                    totalQty: 0,
                })
                    .then(() => {
                        console.log('Cart emptied');

                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    return (
        <Flex>
            <Box className="showcase-lc4uyi" flex={2} p={8}>
                {/* Shipping Information */}
                <Stack className="showcase-6ynasd" spacing={5}>
                    <Stack className="showcase-1mg40jh">
                        <Heading className="showcase-18j379d" size="md">
                            Shipping Information
                        </Heading>

                        <VStack
                            spacing={4}
                            align="stretch"
                            className="showcase-j9f48c"
                        >
                            <FormControl id="name" className="showcase-1kxonj9">
                                <FormLabel className="showcase-ks5u63">
                                    Full name
                                </FormLabel>
                                <Input
                                    placeholder="Your first and last name"
                                    className="showcase-1cjy4zv"
                                />
                            </FormControl>

                            <FormControl
                                id="street"
                                className="showcase-1kxonj9"
                            >
                                <FormLabel className="showcase-ks5u63">
                                    Street address
                                </FormLabel>
                                <Input
                                    placeholder="123 Example Street"
                                    className="showcase-1cjy4zv"
                                />
                            </FormControl>

                            <Stack
                                direction="row"
                                className="showcase-zg985e"
                                spacing={4}
                            >
                                <FormControl
                                    id="zip"
                                    className="showcase-m62dzr"
                                >
                                    <FormLabel className="showcase-ks5u63">
                                        Zip Code
                                    </FormLabel>
                                    <Input
                                        placeholder="Zip Code"
                                        className="showcase-1cjy4zv"
                                    />
                                </FormControl>

                                <FormControl
                                    id="city"
                                    className="showcase-1kxonj9"
                                >
                                    <FormLabel className="showcase-ks5u63">
                                        City
                                    </FormLabel>
                                    <Input
                                        placeholder="City"
                                        className="showcase-1cjy4zv"
                                    />
                                </FormControl>
                            </Stack>

                            <FormControl
                                id="email"
                                className="showcase-1kxonj9"
                            >
                                <FormLabel className="showcase-ks5u63">
                                    Email address
                                </FormLabel>
                                <Input
                                    placeholder="you@example.com"
                                    className="showcase-1cjy4zv"
                                />
                            </FormControl>

                            <Checkbox isChecked className="showcase-1577qb8">
                                Billing address is same as shipping
                            </Checkbox>
                        </VStack>
                    </Stack>

                    {/* Shipping Method */}
                    <Stack className="showcase-1mg40jh">
                        <Heading className="showcase-18j379d" size="md">
                            Shipping Method
                        </Heading>
                        <RadioGroup defaultValue="express">
                            <VStack
                                align="stretch"
                                spacing={4}
                                className="showcase-h9roul"
                            >
                                <Radio
                                    value="express"
                                    className="showcase-2tb95d"
                                >
                                    <Box>
                                        <Stack
                                            direction="row"
                                            justify="space-between"
                                            className="showcase-j4mi5t"
                                        >
                                            <Text>Express</Text>
                                            <Text>$14.99</Text>
                                        </Stack>
                                        <Text>Dispatched in 24 hours</Text>
                                    </Box>
                                </Radio>
                                <Radio
                                    value="standard"
                                    className="showcase-2tb95d"
                                >
                                    <Box>
                                        <Stack
                                            direction="row"
                                            justify="space-between"
                                            className="showcase-j4mi5t"
                                        >
                                            <Text>Standard</Text>
                                            <Text>$4.99</Text>
                                        </Stack>
                                        <Text>Dispatched in 1 - 2 days</Text>
                                    </Box>
                                </Radio>
                            </VStack>
                        </RadioGroup>
                    </Stack>

                    {/* Payment Information */}
                    <Stack className="showcase-1mg40jh">
                        <Heading className="showcase-18j379d" size="md">
                            Payment Information
                        </Heading>
                        <RadioGroup defaultValue="credit-card">
                            <VStack
                                align="stretch"
                                spacing={4}
                                className="showcase-h9roul"
                            >
                                <Radio
                                    value="credit-card"
                                    className="showcase-2tb95d"
                                >
                                    <Box>
                                        <Text>Credit Card</Text>
                                        <Text>
                                            Pay with credit card via Stripe
                                        </Text>
                                        {/* Add logos if needed */}
                                    </Box>
                                </Radio>
                                <Radio
                                    value="paypal"
                                    className="showcase-2tb95d"
                                >
                                    <Box>
                                        <Text>PayPal</Text>
                                        <Text>
                                            Pay with your PayPal account
                                        </Text>
                                        {/* Add logos if needed */}
                                    </Box>
                                </Radio>
                            </VStack>
                        </RadioGroup>
                    </Stack>
                </Stack>
            </Box>
            {/* Sidebar Area */}
            <Box flex="1" bg="gray.50" p="6" borderRadius="md" boxShadow="md">
                <Heading as="h3" size="md" mb="4">
                    Order Summary
                </Heading>
                <Stack spacing="4">
                    {/* Products */}
                    {products?.map((product) => (
                        <Box key={product.id}>
                            <Text fontWeight="bold">{product.title}</Text>
                            <HStack justify="space-between">
                                <Text>Quantity: {product.qty}</Text>
                                <Text>${product.price * product.qty}</Text>
                            </HStack>
                        </Box>
                    ))}

                    {/* Order Summary */}
                    <Box borderTop="1px solid" borderColor="gray.200" pt="4">
                        <HStack justify="space-between">
                            <Text>Subtotal</Text>
                            <Text>${cart.total}</Text>
                        </HStack>
                        <HStack justify="space-between">
                            <Text>Shipping</Text>
                            <Text>$4.99</Text>
                        </HStack>
                        <HStack justify="space-between" fontWeight="bold">
                            <Text>Total</Text>
                            <Text>${cart.total + shippingCost}</Text>
                        </HStack>
                    </Box>

                    {/* Buy Button */}
                    <Button
                        colorScheme="teal"
                        size="lg"
                        w="full"
                        onClick={handleCheckout}
                    >
                        Place Order
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
}
