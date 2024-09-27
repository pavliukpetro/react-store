import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Heading,
    IconButton,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { FaRegStar, FaStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ref, set } from 'firebase/database';
import { useAuth } from '../../context/AuthContext';
import { database } from '../../firebase';
import useCart from '../../hook/use-cart';
import styles from './ProductTile.module.scss';

function ProductTile({ product }) {
    // const { cart, setCart } = useContext(CartContext);
    const { cart, setCart } = useCart();
    const { currentUser } = useAuth();

    function handleBuy() {
        // check if the product is already in the cart
        const newProduct = {
            id: product.id,
            image: product.images[0],
            title: product.title,
            price: product.price,
            qty: 1,
        };

        const productInCartIndex = cart.products.findIndex(
            (cartProduct) => cartProduct.id === product.id
        );

        let products = [...cart.products];

        if (productInCartIndex >= 0) {
            // update the quantity
            cart.products[productInCartIndex].qty += 1;
        } else {
            products = [...cart.products, newProduct];
        }

        // firebase update cart
        if (currentUser) {
            const cartRef = ref(database, `users/${currentUser.uid}/cart`);

            set(cartRef, {
                ...cart,
                products: products,
                totalQty: cart.totalQty + 1,
                total: cart.total + product.price,
            })
                .then(() => {
                    console.log('Product is added to cart');
                    toast('Product is added to cart');
                })
                .catch((error) => {
                    console.log(error);
                    toast(error);
                });
        } else {
            setCart({
                ...cart,
                products: products,
                totalQty: cart.totalQty + 1,
                total: cart.total + product.price,
            });
        }
    }

    return (
        <Card maxW="sm" className={styles.productCart}>
            <CardBody className="product-cart-body">
                <Link to={`/product/${product.id}`}>
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        borderRadius="lg"
                    />
                    <Stack mt="6" spacing="3">
                        {product.title && (
                            <Heading size="md">{product.title}</Heading>
                        )}
                        <Text noOfLines={3}>{product.description}</Text>
                        <Text
                            color="teal.600"
                            fontSize="2xl"
                            className={styles.price}
                        >
                            ${product.price}
                        </Text>
                    </Stack>
                </Link>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2">
                    <Button onClick={handleBuy}>Buy now</Button>
                    <IconButton
                        variant="outline"
                        aria-label="Call Sage"
                        fontSize={'xl'}
                        p={2}
                        icon={
                            product?.isInWishlist ? <FaStar /> : <FaRegStar />
                        }
                    />
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default ProductTile;
