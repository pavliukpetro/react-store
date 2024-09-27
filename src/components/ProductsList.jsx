import { Box, Grid, Text } from '@chakra-ui/react';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../firebase';
import ProductTile from './product/ProductTile';

function ProductsList() {
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     fetch(DB_URL + '/products.json')
    //         .then((res) => res.json())
    //         .then((data) => setProducts(data));
    // }, []);

    useEffect(() => {
        const productRef = ref(database, 'products');

        onValue(productRef, (snapshot) => {
            const products = snapshot.val();

            setProducts(products);
        });
    }, []);

    return (
        <Box className="products">
            <Text>Products List</Text>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {products.map((product) => (
                    <ProductTile key={product.id} product={product} />
                ))}
            </Grid>
        </Box>
    );
}

export default ProductsList;
